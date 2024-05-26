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
TEST_DB_HOST=localhost
TEST_DB_USER=postgres
TEST_DB_PASS=postgres
TEST_DB_NAME=campusconnect
TEST_DB_PORT=5432

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

## Using Swagger

If you want to use the built-in swagger, build the backend like described. Then use the URL provided by the backend (mostly `http://localhost`) now you should see a `Hello World!` for swagger navigate to: `:<backend port>\api-docs`. For example: `http://localhost:6790/api-docs`

Keep in mind, that Swagger sometimes suggests parameters that are falsely fetched from the .js files. Make sure that you enter correct values. For example:

Swagger:

`POST: /api/account/create-account`
```json
{
  "accountID": "d5fE_asz",
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "passwordHash": "$2b$10$EIX/fp5j5TLm1Vsi58xjXe6/uhH2Boe9M5pEERQ/RqA/ff5fJ6wK6"
}
```

Correct: 

`POST: /api/account/create-account`
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "password": "yourPassword"
}
```