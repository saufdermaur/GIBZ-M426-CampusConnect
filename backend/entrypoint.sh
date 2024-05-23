#!/bin/bash

# Wait for PostgreSQL to start
echo "Waiting for PostgreSQL to start..."
while ! pg_isready -h $TEST_DB_HOST -p $TEST_DB_PORT -U $TEST_DB_USER; do
    sleep 1
done

echo "PostgreSQL started."

# Create the database if it does not exist
echo "Creating database if not exists..."
PGPASSWORD=$TEST_DB_PASS psql -h $TEST_DB_HOST -U $TEST_DB_USER -p $TEST_DB_PORT -d postgres -c "SELECT 1 FROM pg_database WHERE datname='$TEST_DB_NAME' LIMIT 1;" | grep -q 1 || PGPASSWORD=$TEST_DB_PASS psql -h $TEST_DB_HOST -U $TEST_DB_USER -p $TEST_DB_PORT -d postgres -c "CREATE DATABASE \"$TEST_DB_NAME\";"

echo "Running migrations..."
npx sequelize-cli db:migrate

echo "Starting application..."
npm start
