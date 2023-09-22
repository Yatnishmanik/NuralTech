# Use an appropriate base image
FROM node:14.20.1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code to the container
COPY . .

# Build the client-side code
RUN npm install

# Expose the desired port
EXPOSE 9050

# Specify the command to run the application
CMD ["npm", "start"]

