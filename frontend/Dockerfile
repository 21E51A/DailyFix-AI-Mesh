# Build stage
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Nginx stage
FROM nginx:alpine

# 🔥 Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# 🔥 Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 🔥 Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
