import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is missing");
  process.exit(1);
}

const sql = neon(url);

await sql`
  CREATE TABLE IF NOT EXISTS products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text NOT NULL DEFAULT '',
    price numeric(12, 2) NOT NULL,
    image_url text NOT NULL,
    image_public_id text NOT NULL,
    category text NOT NULL DEFAULT 'Perfume',
    stock integer NOT NULL DEFAULT 1,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  )
`;

const rows = await sql`
  SELECT column_name, data_type
  FROM information_schema.columns
  WHERE table_name = 'products'
  ORDER BY ordinal_position
`;

console.log("products table ready");
console.table(rows);
