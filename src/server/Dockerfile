FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build

# Generate Prisma Client
RUN npm run generate

# Expose port
EXPOSE 3001

# Start
CMD ["npm", "start"]

