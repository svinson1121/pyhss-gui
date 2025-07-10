# Stage 1: Build the React app
FROM node:latest AS build
WORKDIR /build
COPY . .
RUN npm ci --legacy-peer-deps
RUN npm run justbuild

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Copy custom NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove default nginx static files and add your app
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /build/dist/ /usr/share/nginx/html
