# Use the official Node.js 16 base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install both production and development dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the Express app listens on
EXPOSE 5000

# Start the development server with nodemon
CMD ["npm", "start"]