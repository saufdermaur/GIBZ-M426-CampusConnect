# Docker Deployment Documentation

## Building the Docker Image

First, build your Docker image using the provided Dockerfile. This step compiles your application into a Docker image, which can be run on any system that supports Docker, without requiring node and npm to be installed.

```bash
cd backend
docker build -t campusconnect_backend .
```

This command builds your Docker image with the campusconnect_backend-tag, which you will use to refer to the image in subsequent commands.

## Running the Docker Container

To run your application as a Docker container, use the docker run command. This command allows you to specify environment variables that configure the database connection and other runtime settings.

### Environment Variables

Before running the container, ensure you have the following environment variables ready to specify:

```plaintext
TEST_DB_HOST: Hostname or IP address of your PostgreSQL database server.
TEST_DB_USER: Username for your PostgreSQL database.
TEST_DB_PASS: Password for your PostgreSQL database.
TEST_DB_NAME: Database name to connect to on your PostgreSQL server.
TEST_DB_PORT: Port number on which your PostgreSQL server is running.
JWT_SECRET: Secret key for signing JWTs used in authentication.
```

## Docker Run Command

Run your Docker container using the following command, replacing `campusconnect_backend` with my-node-app or whichever tag you used when building your Docker image:

```bash
docker run -d -p 6790:6790 \
  -e TEST_DB_HOST="192.168.100.88" \
  -e TEST_DB_USER="campusconnect" \
  -e TEST_DB_PASS="campusconnect" \
  -e TEST_DB_NAME="campusconnect" \
  -e TEST_DB_PORT="6789" \
  -e JWT_SECRET="my-secret-jwt-key" \
  --name my-running-app <your-image-name>
```

This command does the following:

- -d runs the container in detached mode (in the background).
- -p 6790:6790 maps port 6790 inside the container to port 6790 on your Docker host. This makes the application accessible via `http://localhost:6790` or your host's IP address on port 6790.
- -e sets the environment variables inside the container as specified.
- --name my-running-app names your container for easier management.

## Checking Container Logs

To view the logs of your running container, use the following command:

```bash
docker logs my-running-app
```

This command is useful for debugging and verifying that your application is running as expected within the Docker container.

## Stopping the Container

To stop the running container:

```bash
docker stop my-running-app
```

And to remove the container after stopping:

```bash
docker rm my-running-app
```
