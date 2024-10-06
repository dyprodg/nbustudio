# Development Stage
FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000


CMD ["npm", "run", "dev"]

# Builder Stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Production Stage 

FROM node:20-alpine AS production

WORKDIR /app

# Copy the required build files for standalone mode
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set the environment variables (if needed)
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "server.js"]