## Backend Structure

backend/
 ├── venv/                ← ignore
 ├── app/
 │   ├── main.py          ← app bootstrap (NO CRUD here)
 │   ├── core/            ← DB, config, security
 │   ├── models/          ← SQLAlchemy models
 │   ├── schemas/         ← Pydantic schemas
 │   ├── routers/         ← 👈 ALL APIs (CRUD)
 │   └── services/        ← (optional) business logic
 └── .env


## Visual flow of model and schema interations

Client JSON
   ↓
Pydantic (TaskCreate)
   ↓ validated data
SQLAlchemy (Task)
   ↓
PostgreSQL
   ↓
SQLAlchemy (Task)
   ↓
Pydantic (TaskResponse)
   ↓
Client JSON


## FastApi Backend Flow

1 . Create Model a layer to talk to database
2 . Create Schema a pydantic layer to talk to api's
3 . Create Router Files our normal API's
4 . Need to declare them in main.py


## Start the server
uvicorn app.main:app --reload

