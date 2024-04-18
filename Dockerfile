#THIS IS A PLACEHOLDER AND SHOULD BE CONFIGURED AS NEEDED

# Build frontend
FROM node:14 AS frontend-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Build backend
FROM node:14 AS backend-build
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
RUN npm run build

# Final image
FROM node:14
WORKDIR /app
COPY --from=backend-build /app /app
COPY --from=frontend-build /app/dist /app/public
EXPOSE 3000
CMD ["node", "server.js"]
