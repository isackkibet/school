# ICS Identity & Experience Layer (IXL) — Run-to-Green Developer Pack

IXL is the unified identity, access, navigation, transcript, competency passport, and graduate handoff layer for the ICS Technical College ecosystem.

## Architectural Decision
- Pattern: Modular Monolith, DDD-ready, microservice-extractable later.
- Auth: JWT access tokens + refresh tokens + RBAC.
- AI/LLM: no direct OpenAI calls here. AI access flows through YohPal Brain.
- Source-of-truth rule: IXL owns identity/profile/navigation; Smart Prospectus owns course catalogue; ICS Live owns detailed academic operations; Smart Lecturer owns AI learning operations; AI E-Library owns reference materials; YohPal Jobs/Hustle own employment.

## Run locally
```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run start:dev
```

```bash
cd admin-web
npm install
npm run dev
```

## Main APIs
- POST /auth/login
- POST /auth/register-prospect
- POST /auth/refresh
- GET /me
- GET /me/navigation
- GET /me/access
- GET /me/transcript
- GET /me/competency-passport
- POST /graduate/handoff/jobs
- POST /graduate/handoff/hustle

## Ecosystem Flow
Website creates prospect/applicant -> IXL creates ICS ID -> Smart Prospectus validates course -> ICS Live creates academic record -> mode routes learning access -> AI E-Library resources unlock -> graduate profile is handed to YohPal Jobs/Hustle.
