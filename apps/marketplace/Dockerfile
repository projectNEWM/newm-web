# Use the official Node.js 18 image as the base  
FROM node:20 as base

# Install most recent version of npm
RUN npm install -g npm@10.7.0
ENV NEXT_TELEMETRY_DISABLED 1

FROM base as deps

WORKDIR /usr/src/app

COPY --chown=node:node  *.json ./
COPY --chown=node:node  .nvmrc ./
COPY --chown=node:node  scripts ./scripts

# Install dependencies  
RUN npm ci 

FROM base as build

WORKDIR /usr/src/app

COPY --chown=node:node  --from=deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node ./ ./

# Build the production app
RUN npx nx build marketplace

FROM base as runtime

WORKDIR /app

ENV PORT 4200
ENV HOST 0.0.0
ENV NEXT_TELEMETRY_DISABLED 1

COPY --chown=node:node  --from=build /usr/src/app/dist/apps/marketplace ./dist/apps/marketplace
COPY --chown=node:node  --from=build /usr/src/app/node_modules ./node_modules

USER node
EXPOSE 3000
ENV PORT 3000

WORKDIR /app/dist/apps/marketplace
CMD npm start
