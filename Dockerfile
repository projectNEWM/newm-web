# Use the official Node.js 18 image as the base  
FROM node:18 as dependencies

# Install most recent version of npm
RUN npm install -g npm@10.7.0

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container  
COPY package*.json ./  

# Install dependencies  
RUN npm ci  

FROM node:18 as runtime

WORKDIR /usr/src/app

# Copy installed dependencies and source files to container
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY ./ ./  

RUN chown -R node:node .
USER node

EXPOSE 3000

# Build the production app
RUN npx nx build marketplace

# Run the production app 
CMD npx nx serve marketplace --prod