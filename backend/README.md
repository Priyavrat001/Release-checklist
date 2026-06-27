# Backend

This repository contains the backend API for the release checklist application.

**Overview**

- Base API path: `/api/v1/releases`
- Purpose: create and manage releases that include named checklist steps and track release status.

**Tech stack**

- Node.js (ES Modules)
- Express
- Prisma ORM (PostgreSQL)
- dotenv for environment variables
- CORS
- nodemon (development)

**Prerequisites**

- Node.js >=16
- PostgreSQL-compatible database (this project is configured to use Neon DB) and a valid `DATABASE_URL`

**Repository: key files**

- [backend/app.js](backend/app.js) — server bootstrap and route mounting
- [backend/routes/release.js](backend/routes/release.js) — Express routes for release endpoints
- [backend/controller/release.js](backend/controller/release.js) — route handlers / business logic
- [backend/constants/releaseSteps.js](backend/constants/releaseSteps.js) — default checklist steps
- [backend/utils/releaseStatus.js](backend/utils/releaseStatus.js) — computes `planned|ongoing|done`
- [backend/prisma/schema.prisma](backend/prisma/schema.prisma) — Prisma schema
- [backend/prisma/client.js](backend/prisma/client.js) — Prisma client instance

File structure (top-level of `backend/`):

```
backend/
├─ app.js
├─ package.json
├─ prisma/
│  ├─ schema.prisma
│  └─ client.js
├─ routes/
│  └─ release.js
├─ controller/
│  └─ release.js
├─ constants/
│  └─ releaseSteps.js
├─ utils/
│  └─ releaseStatus.js
└─ README.md
```

Environment (.env) sample

Create a `.env` file in `backend/` with at least the following values:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require&channel_binding=require"
PORT=5000
NODE_ENV=development
```

Notes: replace `USER`, `PASSWORD`, `HOST`, and `DATABASE` with your Neon DB values. If you are using Neon, your connection string will usually look like a PostgreSQL URL with `sslmode=require` and `channel_binding=require`. Prisma reads `DATABASE_URL` in `prisma/schema.prisma`.

Database / Prisma

- The Prisma model used:

See [backend/prisma/schema.prisma](backend/prisma/schema.prisma) — the `Release` model contains `id`, `name`, `dueDate`, optional `additionalInfo`, `steps` (JSON), and timestamps.

- After creating/updating `.env`, run:

```bash
npm install
npx prisma generate
# if you want to apply migrations (if using dev DB):
npx prisma migrate dev --name init
```

API Endpoints

Base URL: `http://localhost:${process.env.PORT || 5000}/api/v1/releases`

1) Create a release

- Method: `POST`
- Path: `/api/v1/releases/`
- Request body (application/json):

```json
{
	"name": "Release 1",
	"dueDate": "2026-07-01T00:00:00.000Z",
	"additionalInfo": "Optional notes"
}
```

- Validation: `name` and `dueDate` are required. If missing, returns 400 with a JSON error.

- Success response: `200 OK` with the created release JSON (example):

```json
{
	"id": 1,
	"name": "Release 1",
	"dueDate": "2026-07-01T00:00:00.000Z",
	"additionalInfo": "Optional notes",
	"steps": [
		{ "name": "Requirements Review", "completed": false },
		{ "name": "Code Review", "completed": false }
	],
	"createdAt": "2026-06-25T12:00:00.000Z",
	"updatedAt": "2026-06-25T12:00:00.000Z",
	"status": "planned"
}
```

2) Get all releases

- Method: `GET`
- Path: `/api/v1/releases/`
- Success response: `200 OK` with an array of releases. Each release includes a computed `status` (see `utils/releaseStatus.js`).

3) Get single release

- Method: `GET`
- Path: `/api/v1/releases/:id`
- Success: `200 OK` with release object + `status`. If not found, `404`.

4) Toggle a checklist step

- Method: `PATCH`
- Path: `/api/v1/releases/:id/step/:stepIndex`
- Behavior: toggles the boolean `completed` for the step at `stepIndex` (0-based).
- Success: `200 OK` with the updated release object and recomputed `status`.

Example curl:

```bash
curl -X PATCH "http://localhost:5000/api/v1/releases/1/step/0"
```

5) Update release additional info

- Method: `PATCH`
- Path: `/api/v1/releases/:id/info`
- Request body (application/json):

```json
{ "additionalInfo": "Updated notes for this release" }
```

- Success: `200 OK` with the updated release object.

6) Delete a release

- Method: `DELETE`
- Path: `/api/v1/releases/:id`
- Success: `200 OK` with `{ "message": "Release deleted" }`.

Status semantics

- The `status` field is computed from `steps` in `utils/releaseStatus.js`:
	- `planned` — no completed steps
	- `ongoing` — some steps completed, not all
	- `done` — all steps completed

Quick local setup

1. From `backend/` install dependencies:

```bash
npm install
```

2. Create `.env` (see sample above).

3. Generate Prisma client:

```bash
npx prisma generate
```

4. (Optional) Run migrations (if you want a fresh DB):

```bash
npx prisma migrate dev --name init
```

5. Start server (development):

```bash
npm run dev
```

Testing

The backend uses Node.js built-in test support with the `node:test` module. This makes it easy to add fast, dependency-light automated tests for logic such as status calculation, validation, and route behavior.

### Testing tools

- Node.js test runner (`node:test`)
- Node.js assert module for expectations

### Test files

- [backend/tests/releaseStatus.test.js](backend/tests/releaseStatus.test.js) — covers the release status logic for planned, ongoing, and done states

### Commands to run tests

Run all backend tests:

```bash
npm test
```

Run a specific test file:

```bash
node --test tests/releaseStatus.test.js
```

### Example test cases covered

The current backend tests verify that the release status helper returns:

- `planned` when no steps are completed
- `done` when all steps are completed
- `ongoing` when some steps are completed

### How to add more tests

1. Create a new file in the `tests` folder with a `.test.js` suffix.
2. Import the module you want to test.
3. Use `test()` and `assert` from Node.js.
4. Run the suite with `npm test`.

Example pattern:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { someFunction } from '../utils/someModule.js';

test('returns expected result', () => {
  assert.equal(someFunction(input), expectedValue);
});
```

### Examples / troubleshooting

- If you see `prisma` client errors, ensure `DATABASE_URL` is valid and run `npx prisma generate`.
- The API is mounted at `/api/v1/releases` in [backend/app.js](backend/app.js).

If you'd like, I can also:

- Add automated examples (Postman collection or OpenAPI spec).
- Update the frontend README to reflect the exact API URLs.

---
Updated backend README with detailed API docs and environment examples.
