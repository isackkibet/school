# ICS Smart Prospectus Engine — Run-to-Green Developer Pack

Source system: ICS Technical College official prospectus, especially admission rules, payment details, fee tables, practical fees and tool requirements.

## Apps
- `backend/` NestJS + Prisma + PostgreSQL API
- `admin/` Next.js admin dashboard starter
- `website/` Next.js public AI course advisor starter
- `mobile_flutter/lib/models/` Flutter/Web data models

## Quick start
```bash
docker compose up -d
cd backend
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run seed
npm run dev
```

Backend runs at `http://localhost:4000/api/v1`.

## Key APIs
- `GET /api/v1/courses`
- `POST /api/v1/fees/calculate`
- `POST /api/v1/eligibility/check`
- `POST /api/v1/ai/course-recommendations`

## Required production work
1. Complete seed data for all prospectus courses.
2. Add authentication and role-based admin access.
3. Add audit logs for fee and admission rule changes.
4. Add CSV/PDF prospectus importer.
5. Connect to ICS Live, Smart Lecturer, AI E-Library and smart website.
