import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { insertLead, listLeads, updateLeadStatus } from "./db";
import { sendLeadNotification } from "./telegram";

const leadStatusEnum = z.enum([
  "new",
  "in_progress",
  "contacted",
  "closed",
  "not_interested",
]);

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Chỉ quản trị viên mới có quyền truy cập",
    });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  contact: router({
    submitLead: publicProcedure
      .input(
        z.object({
          name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự").max(255),
          phone: z
            .string()
            .min(9, "Số điện thoại không hợp lệ")
            .max(15, "Số điện thoại không hợp lệ")
            .regex(/^[0-9+\s.-]+$/, "Số điện thoại chỉ chứa số"),
          interest: z.string().max(100).optional().nullable(),
          budget: z.string().max(100).optional().nullable(),
          note: z.string().max(2000).optional().nullable(),
          source: z.string().max(100).optional().nullable(),
        }),
      )
      .mutation(async ({ input }) => {
        // Normalize phone (remove spaces/dots)
        const normalizedPhone = input.phone.replace(/[\s.-]/g, "");

        const inserted = await insertLead({
          name: input.name.trim(),
          phone: normalizedPhone,
          interest: input.interest || null,
          budget: input.budget || null,
          note: input.note || null,
          source: input.source || "website",
        });

        if (!inserted) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Không thể lưu thông tin liên hệ",
          });
        }

        // Send Telegram notification (do not block response on error)
        sendLeadNotification({
          id: inserted.id,
          name: inserted.name,
          phone: inserted.phone,
          interest: inserted.interest,
          budget: inserted.budget,
          note: inserted.note,
          source: inserted.source,
          createdAt: inserted.createdAt,
        }).catch((err) => console.error("[Telegram] async error:", err));

        return { success: true, id: inserted.id };
      }),

    getLeads: adminProcedure.query(async () => {
      const rows = await listLeads();
      return rows;
    }),

    updateLeadStatus: adminProcedure
      .input(
        z.object({
          id: z.number().int().positive(),
          status: leadStatusEnum,
          adminNote: z.string().max(2000).optional().nullable(),
        }),
      )
      .mutation(async ({ input }) => {
        const updated = await updateLeadStatus(input.id, input.status, input.adminNote);
        if (!updated) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Không tìm thấy lead",
          });
        }
        return updated;
      }),
  }),
});

export type AppRouter = typeof appRouter;
