FROM node:22-alpine3.19
LABEL authors="thanawy"

WORKDIR /app

# Copy only necessary files to optimize build
COPY package*.json /app/

RUN npm install

# Copy the rest of the app
COPY . /app

# Build the app (next build)
RUN npm run build

# Ensure the startup script is executable
COPY startup.sh /app/startup.sh
RUN chmod +x /app/startup.sh

ENTRYPOINT ["/app/startup.sh"]
