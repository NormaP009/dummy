# Use a base image
FROM node:16

# Set the working directory
WORKDIR /app

#Copy package.json and package-lock.json
COPY package*.json ./


# Install dependencies (if any)
RUN npm install

# Copy the project files to the container
COPY . .


# expose the port
EXPOSE 3030

#stablish the environment variable
ENV host=0.0.0.0


# Specify the command to run when the container starts
CMD ["npm", "start"]