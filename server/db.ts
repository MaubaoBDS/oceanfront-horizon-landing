import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertLead, InsertUser, leads, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================================
// Leads helpers
// ============================================================

export async function insertLead(lead: InsertLead) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(leads).values(lead);
  // mysql2 returns insertId in the result
  const insertId = (result as unknown as Array<{ insertId: number }>)[0]?.insertId
    ?? (result as unknown as { insertId?: number }).insertId
    ?? 0;

  // Fetch the just-inserted row to return full details
  if (insertId) {
    const rows = await db.select().from(leads).where(eq(leads.id, insertId)).limit(1);
    if (rows.length > 0) return rows[0];
  }
  // Fallback: return the most recent lead with same phone
  const rows = await db
    .select()
    .from(leads)
    .where(eq(leads.phone, lead.phone))
    .orderBy(desc(leads.id))
    .limit(1);
  return rows[0];
}

export async function listLeads() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(leads).orderBy(desc(leads.createdAt));
}

export async function updateLeadStatus(
  id: number,
  status: "new" | "in_progress" | "contacted" | "closed" | "not_interested",
  adminNote?: string | null,
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const updates: Record<string, unknown> = { status };
  if (adminNote !== undefined) {
    updates.adminNote = adminNote;
  }

  await db.update(leads).set(updates).where(eq(leads.id, id));

  const rows = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return rows[0];
}
