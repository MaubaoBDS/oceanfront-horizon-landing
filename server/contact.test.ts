import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("./db", () => ({
  insertLead: vi.fn(async (input) => ({
    id: 1,
    ...input,
    status: "new",
    adminNote: null,
    createdAt: new Date("2026-05-22T07:00:00Z"),
    updatedAt: new Date("2026-05-22T07:00:00Z"),
  })),
  listLeads: vi.fn(async () => []),
  updateLeadStatus: vi.fn(async (id, status, adminNote) => ({
    id,
    name: "Test",
    phone: "0900000000",
    interest: null,
    budget: null,
    note: null,
    source: "website",
    status,
    adminNote: adminNote ?? null,
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
}));

vi.mock("./telegram", () => ({
  sendLeadNotification: vi.fn(async () => true),
}));

import { appRouter } from "./routers";
import { insertLead, listLeads } from "./db";
import { sendLeadNotification } from "./telegram";
import type { TrpcContext } from "./_core/context";

function createCtx(role: "user" | "admin" | null = null): TrpcContext {
  const user = role
    ? {
        id: 1,
        openId: "test-user",
        email: "test@example.com",
        name: "Test",
        loginMethod: "manus",
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      }
    : null;
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("contact.submitLead", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("inserts a valid lead and triggers Telegram notification", async () => {
    const caller = appRouter.createCaller(createCtx());
    const result = await caller.contact.submitLead({
      name: "Nguyễn Văn A",
      phone: "0933.235.444",
      interest: "bang-gia",
      budget: "3-4-ty",
      note: "Cần tư vấn gấp",
      source: "hero-cta",
    });

    expect(result.success).toBe(true);
    expect(result.id).toBe(1);
    expect(insertLead).toHaveBeenCalledTimes(1);
    const arg = vi.mocked(insertLead).mock.calls[0][0];
    // Phone should be normalized (no dots/spaces)
    expect(arg.phone).toBe("0933235444");
    expect(arg.name).toBe("Nguyễn Văn A");
    expect(arg.source).toBe("hero-cta");

    // Wait for the async telegram call to be invoked
    await new Promise((r) => setTimeout(r, 10));
    expect(sendLeadNotification).toHaveBeenCalledTimes(1);
  });

  it("rejects names that are too short", async () => {
    const caller = appRouter.createCaller(createCtx());
    await expect(
      caller.contact.submitLead({
        name: "A",
        phone: "0933235444",
      }),
    ).rejects.toThrow();
  });

  it("rejects invalid phone numbers", async () => {
    const caller = appRouter.createCaller(createCtx());
    await expect(
      caller.contact.submitLead({
        name: "Nguyen Van B",
        phone: "abc-not-a-phone",
      }),
    ).rejects.toThrow();
  });

  it("defaults source to 'website' when omitted", async () => {
    const caller = appRouter.createCaller(createCtx());
    await caller.contact.submitLead({
      name: "Nguyễn Văn C",
      phone: "0987654321",
    });
    const arg = vi.mocked(insertLead).mock.calls[0][0];
    expect(arg.source).toBe("website");
  });
});

describe("contact admin endpoints (RBAC)", () => {
  beforeEach(() => vi.clearAllMocks());

  it("blocks unauthenticated users from getLeads", async () => {
    const caller = appRouter.createCaller(createCtx(null));
    await expect(caller.contact.getLeads()).rejects.toThrow();
  });

  it("blocks regular users from getLeads (forbidden)", async () => {
    const caller = appRouter.createCaller(createCtx("user"));
    await expect(caller.contact.getLeads()).rejects.toThrow(
      /quản trị viên|FORBIDDEN/i,
    );
  });

  it("allows admin users to getLeads", async () => {
    const caller = appRouter.createCaller(createCtx("admin"));
    const result = await caller.contact.getLeads();
    expect(Array.isArray(result)).toBe(true);
    expect(listLeads).toHaveBeenCalledTimes(1);
  });

  it("blocks regular users from updating lead status", async () => {
    const caller = appRouter.createCaller(createCtx("user"));
    await expect(
      caller.contact.updateLeadStatus({ id: 1, status: "contacted" }),
    ).rejects.toThrow();
  });

  it("allows admin to update lead status", async () => {
    const caller = appRouter.createCaller(createCtx("admin"));
    const result = await caller.contact.updateLeadStatus({
      id: 1,
      status: "closed",
      adminNote: "Đã chốt deposit",
    });
    expect(result.status).toBe("closed");
    expect(result.adminNote).toBe("Đã chốt deposit");
  });
});
