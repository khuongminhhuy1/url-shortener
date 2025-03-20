# Use official Node.js image
FROM node:18

# Copy package.json and package-lock.json first (better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build TypeScript (important if you're using TypeScript)
RUN npm run build

# Expose the backend port
EXPOSE 5000

# Start the server using the built files
CMD ["node", "dist/index.js"]
