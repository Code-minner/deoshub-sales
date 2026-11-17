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
  ADD COLUMN IF NOT EXISTS subname text NOT NULL DEFAULT ''
`;

await sql`
  UPDATE products
  SET category = 'EDP'
  WHERE category IS NULL
     OR category = ''
     OR category = 'Perfume'
`;

const rows = await sql`
  SELECT column_name, data_type
  FROM information_schema.columns
  WHERE table_name = 'products'
  ORDER BY ordinal_position
`;

console.log("subname column ready");
console.table(rows);
