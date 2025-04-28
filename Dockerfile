FROM node:22-alpine3.19
LABEL authors="thanawy"

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Expose port (optional, but nice)
EXPOSE 3000

# Start serving production build
CMD ["serve", "-s", "dist", "-l", "3000"]
