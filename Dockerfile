# Use the official Node.js 18 image as base
FROM --platform=linux/amd64 node:18.16.1

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

# Expose port for Node.js
EXPOSE 9090

# Command to start the application
CMD ["npm", "start"]
