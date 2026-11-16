import { desc, eq } from "drizzle-orm";
import { db } from "./db";
import { products, type NewProduct } from "./schema";

export async function listProducts() {
  return db.select().from(products).orderBy(desc(products.createdAt));
}

export async function getProduct(id: string) {
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);
  return rows[0] ?? null;
}

export async function createProduct(data: NewProduct) {
  const rows = await db.insert(products).values(data).returning();
  return rows[0];
}

export async function updateProduct(
  id: string,
  data: Partial<NewProduct>,
) {
  const rows = await db
    .update(products)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(products.id, id))
    .returning();
  return rows[0] ?? null;
}

export async function deleteProduct(id: string) {
  const rows = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning();
  return rows[0] ?? null;
}
