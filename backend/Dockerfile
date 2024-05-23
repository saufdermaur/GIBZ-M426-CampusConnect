FROM node:14
WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y postgresql-client
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod +x ./entrypoint.sh
EXPOSE 6790
ENTRYPOINT ["./entrypoint.sh"]
