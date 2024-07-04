# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of your application code
COPY . .

# Make port 6791 available to the world outside this container
EXPOSE 6791

# Define environment variable
ENV NODE_ENV=production

# Run npm run serve when the container launches
CMD ["npm", "run", "serve"]
