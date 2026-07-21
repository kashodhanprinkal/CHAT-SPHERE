# build frontend

FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend . 
RUN npm run build


# build backend
FROM node:20-alpine

WORKDIR /app

# Copy backend
COPY backend ./backend

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Copy frontend build
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
