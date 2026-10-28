# Run-to-Green Manual

1. Start infrastructure: `docker compose -f infra/docker-compose.yml up -d`
2. Backend: `cd backend && cp .env.example .env && npm install`
3. Generate client: `npx prisma generate`
4. Migrate: `npx prisma migrate dev --name init`
5. Seed: `npm run seed`
6. Start backend: `npm run start:dev`
7. Admin: `cd ../admin-web && npm install && npm run dev`

Default admin: admin@ics.ac.ke / Admin@12345
