# Use Node.js base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and .env explicitly
COPY . .
COPY .env .env

# Build TypeScript
RUN npm run build

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3001

# Start compiled JS
CMD ["node", "dist/server.js"]

