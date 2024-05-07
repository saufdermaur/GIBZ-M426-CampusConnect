# Setup documentation

## Environment setup

Follow these steps to set up the backend environment on your local machine:

```bash
cd backend
npm install
npm install --save sequelize
npm install --save pg pg-hstore
```

## Database Configuration

### Online Hosting

For online database hosting, obtain a free PostgreSQL database using providers like:

- [Neon](https://neon.tech/)
- [ElephantSQL](https://www.elephantsql.com/)
- [Hasura](https://hasura.io/)
- [Aiven](https://aiven.io/)

### Local Hosting

For local database setup, follow these steps:

1. Install PostgreSQL using the [official installer](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).
2. Configure the database according to [this guide](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database).

## Environment Configuration

Create a `.env` file in the root of your backend directory with the following content to configure database connection parameters:

```plaintext
DEV_DB_HOST=localhost
DEV_DB_USER=postgres
DEV_DB_PASS=postgres
DEV_DB_NAME=campusconnect
DEV_DB_PORT=5432

JWT_SECRET=my-secret-jwt-key
```

## Initialize Database

Create the database using the name specified in the .env file and migrate using Sequelize:

```bash
npx sequelize-cli db:migrate
```

## Running the Backend

To run the backend server, use the following command:

```bash
node server.js
```
