# ICS Smart Prospectus Engine

A digital prospectus and student guidance platform for ICS Technical College. The system brings together course information, admissions rules, fee calculations, eligibility checks, and AI-powered course recommendations into one connected ecosystem.

## Overview

This project is designed to modernize the traditional prospectus into a structured digital platform that can be used by:

- Students exploring programs and admission requirements
- Administrators managing courses, fees, and academic rules
- Advisors recommending the best program fit
- Mobile and web clients consuming the same backend data

## What the system does

- Stores and serves academic course information
- Applies admission and eligibility logic
- Calculates fees and practical costs
- Recommends relevant courses based on student profile information
- Provides a backend API for web and mobile apps
- Supports a central data layer for future integration with broader ICS systems

## How it works

1. The backend API is built with NestJS and Prisma.
2. Course, fee, eligibility, and recommendation data are stored in PostgreSQL.
3. Admin and web interfaces consume the API to display information to users.
4. Rules from the prospectus are encoded in the backend so tuition, eligibility, and recommendation logic can be checked automatically.
5. Frontend clients can call the API to calculate fees, verify student eligibility, and suggest suitable programs.

## Main modules

- Backend API: NestJS + Prisma + PostgreSQL
- Admin dashboard: Next.js
- Student/advisor experience: Next.js web app
- Mobile models: Flutter/Dart
- Documentation and system packs: project docs and reference materials

## Key API endpoints

- GET /api/v1/courses
- POST /api/v1/fees/calculate
- POST /api/v1/eligibility/check
- POST /api/v1/ai/course-recommendations

## Languages and technologies used

### Backend
- TypeScript
- NestJS
- Prisma ORM
- PostgreSQL

### Frontend
- TypeScript
- Next.js
- React

### Mobile
- Dart
- Flutter

### DevOps / tooling
- Docker
- Docker Compose
- Node.js
- npm

## Project structure

```text
.
├── backend/                # NestJS API
├── admin/                 # Admin app
├── admin-web/             # Admin web dashboard
├── website/               # Public/advisor frontend
├── mobile_flutter/        # Flutter app files
├── docs/                  # Project docs and run-to-green guides
├── infra/                 # Infrastructure config
├── docker-compose.yml     # Local services setup
├── package.json            # Root project metadata
├── README.md              # Project overview
└── .gitignore
```

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

The backend runs at:

```text
http://localhost:4000/api/v1
```

## Development notes

This project is structured as a developer-ready starter for a smart prospectus engine. It can be expanded with:

- role-based authentication for admins and students
- audit logs for updated rules and fees
- CSV/PDF prospectus import tools
- stronger AI recommendation logic
- integration with campus systems such as ICS Live, Smart Lecturer, and E-Library services

## Status

This repository is a working starter and prototype for the ICS Smart Prospectus Engine. It is designed to support rapid iteration and extension into a production-ready student advising platform.

## License

This project is currently used as an internal development project and may be adapted for institutional deployment based on project requirements.
