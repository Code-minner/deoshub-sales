# Deo's Hub Sales

One-page perfume storefront with WhatsApp ordering, plus an admin panel to upload products to Neon and Cloudinary.

## Setup

1. Copy env file and fill in your keys:

```bash
cp .env.example .env.local
```

2. Push the database schema to Neon:

```bash
npm run db:push
```

3. Start the app:

```bash
npm run dev
```

- Storefront: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Env values you need

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon connection string |
| `CLOUDINARY_CLOUD_NAME` / `API_KEY` / `API_SECRET` | Image uploads |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Admin login |
| `AUTH_SECRET` | Signs the admin session cookie |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Digits only, e.g. `2349045900732` |
