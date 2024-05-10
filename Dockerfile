# Use the official Node.js 18 image as the base  
FROM node:18 as dependencies

# Install most recent version of npm
RUN npm install -g npm@10.7.0

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container  
COPY package*.json ./  

# Install dependencies  
RUN npm ci  

FROM node:18 as build

WORKDIR /usr/src/app

# Copy installed dependencies and source files to container
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY ./ ./  

# Build the production app
RUN npx nx build marketplace

FROM node:18 as compiled

WORKDIR /usr/src/app

# Copy the compiled code and node modules to the container
COPY --from=build /usr/src/app/dist/apps/marketplace ./dist/apps/marketplace
COPY --from=build /usr/src/app/node_modules ./node_modules

RUN chown -R node:node .
USER node
EXPOSE 3000

# Start the app from inside the compiled code
WORKDIR /usr/src/app/dist/apps/marketplace
CMD npm start
