-- Run once in the Neon SQL editor (or any Postgres client).
ALTER TABLE products
ADD COLUMN IF NOT EXISTS scents text NOT NULL DEFAULT '[]';
