# Use official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app
# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project
COPY . .

# Set environment variables (you can also use .env file)

# Expose the backend port
EXPOSE 5000

# Start the server
CMD ["npm", "run", "start"]
