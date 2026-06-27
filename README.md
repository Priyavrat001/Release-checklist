# Cactro Project

This repository contains a release checklist application with a React frontend and an Express + Prisma backend.

## Project structure

- frontend/: Vite + React user interface
- backend/: Express API with Prisma and PostgreSQL
- compose.yml: Docker Compose configuration for local development

## Local development

### 1. Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Docker and Docker Compose (for local container-based setup)
- PostgreSQL-compatible database (this project uses Neon DB for the database connection)

### 2. Backend setup

Go to the backend folder and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder with your database connection details:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
PORT=5000
NODE_ENV=development
```

Generate Prisma client:

```bash
npx prisma generate
```

If needed, apply migrations:

```bash
npx prisma migrate dev --name init
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend setup

Open a new terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run locally and connect to the backend API.

## Testing

### Backend tests

```bash
cd backend
npm test
```

### Frontend tests

```bash
cd frontend
npm test -- --run
```

## Docker guide (local use only)

This Docker setup is intended for local development and testing only.
It is not recommended for production use.

### Start everything with Docker Compose

From the project root:

```bash
docker compose up --build
```

This will build and start the frontend and backend services locally.

### Stop the containers

```bash
docker compose down
```

### Useful Docker commands

View running containers:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f
```

Rebuild containers without cache:

```bash
docker compose build --no-cache
```

## Notes

- The backend expects a valid database connection through Prisma.
- If you use Docker locally, make sure your environment variables are correctly configured.
- For local development, keep the services running on your machine only.
