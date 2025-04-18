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

ARG NEXT_PUBLIC_ENV
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY_PROD
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY_STAGING
ARG NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID_PROD
ARG NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID_STAGING

# Build the production app
RUN npx nx build mobile-wallet-connector --no-cloud

FROM base as runtime

WORKDIR /app

ENV PORT 4300
ENV HOST 0.0.0
ENV NEXT_TELEMETRY_DISABLED 1

COPY --chown=node:node  --from=build /usr/src/app/dist/apps/mobile-wallet-connector ./dist/apps/mobile-wallet-connector
COPY --chown=node:node  --from=build /usr/src/app/node_modules ./node_modules

USER node
EXPOSE 3000
ENV PORT 3000

WORKDIR /app/dist/apps/mobile-wallet-connector
CMD npm start
