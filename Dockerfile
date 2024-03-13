# Use the official Node.js 18 image as base
FROM node:18.16.1

# Install Redis
RUN apt-get update && apt-get install -y redis-server 

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Install TypeScript
RUN npm install typescript@4.5.5

# Copy other files
COPY .env ./
COPY . .

# Build TypeScript files
RUN npm run build

# Set environment variables
ENV PORT=9090

# Expose ports for Node.js and Redis
EXPOSE 9090 6379

CMD ["redis-server", "--daemonize", "yes"] && ["npm", "start"]  
