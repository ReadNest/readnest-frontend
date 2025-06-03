FROM node:20-alpine AS frontend_build

WORKDIR /app

COPY package*.json ./
COPY [".env.development.local", ".env.production.local"]

RUN npm install --legacy-peer-deps

COPY . .


RUN npm run build

FROM nginx:stable-alpine
COPY --from=frontend_build /app/dist /usr/share/nginx/html