import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is missing");
  process.exit(1);
}

const sql = neon(url);

await sql`
  ALTER TABLE products
  ADD COLUMN IF NOT EXISTS compare_at_price numeric(12, 2)
`;

const rows = await sql`
  SELECT column_name, data_type, is_nullable
  FROM information_schema.columns
  WHERE table_name = 'products'
  ORDER BY ordinal_position
`;

console.log("compare_at_price column ready");
console.table(rows);
