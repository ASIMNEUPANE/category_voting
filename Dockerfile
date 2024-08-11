# Base image
FROM node:20-alpine3.20 AS base

WORKDIR /usr/src/app
RUN apk add --no-cache libc6-compat

# Install dependencies
COPY package*.json ./
RUN npm install

# Development stage
FROM base AS development
COPY . .
CMD ["npm", "run", "dev"]

# Production stage
FROM base AS production
COPY package*.json ./
RUN npm install --production
COPY . .
CMD ["npm", "run", "start"]
