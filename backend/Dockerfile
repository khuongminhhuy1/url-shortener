# Use official Node.js image
FROM node:18


WORKDIR /app
# Copy package.json and package-lock.json first (better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Run Prisma generate to create Prisma Client
RUN npx prisma generate

# Build TypeScript (important if you're using TypeScript)
RUN npm run build
RUN ls -R /app/dist
RUN ls -R /app/src

# Expose the backend port
EXPOSE 8080

# Start the server using the built files
CMD ["node", "dist/index.js"]
