FROM node:22-alpine AS build

# Create directory
WORKDIR /app

# Copy all files
COPY . .

# Install typescript, nodemon globally
RUN npm install -g typescript
RUN npm install -g nodemon
RUN npm cache clean --force

# Install package
RUN npm install

# Build to project
RUN npm run build

# Expose to port 3000
EXPOSE 3000

EXPOSE 8080
# Run node server
CMD npm run start