# Stage 1: Build Vite app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy files and install dependencies
COPY . .
RUN npm install  && npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config (adjust path if needed)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to Nginx's web root
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]


# FROM node:18 AS build

# # Set the working directory
# WORKDIR /app

# # Install dependencies
# COPY package.json package-lock.json ./
# RUN npm install

# # Copy the rest of the code and build the app
# COPY . .
# # RUN npm run build

# # # Use an official Nginx image to serve the build output
# # FROM nginx:alpine
# # COPY --from=build /app/build /usr/share/nginx/html

# # Expose port 80
# EXPOSE 3000

# # Start Nginx server
# # CMD ["nginx", "-g", "daemon off;"]
# CMD ["npm", "start", "--host", "0.0.0.0", "--port", "80"]