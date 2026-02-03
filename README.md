# Backend (Node + MySQL)

This backend provides simple authentication endpoints (signup, login) using MySQL.

Quick start:

1. Copy `.env.example` to `.env` and fill values.
2. Create the database and table by running `schema.sql` in your MySQL server:

```sql
-- in mysql client
SOURCE schema.sql;
```

3. Install dependencies and run server:

```bash
cd backend
npm install
npm run dev   # requires nodemon (optional) or npm start
```

Endpoints:
- `POST /api/auth/signup` { name, email, password }
- `POST /api/auth/login` { email, password }

Responses include a simple JWT token for client use.
