FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the code and build the app
COPY . .
# RUN npm run build

# # Use an official Nginx image to serve the build output
# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]
CMD ["npm", "start" "--host", "0.0.0.0", "--port", "80"]
