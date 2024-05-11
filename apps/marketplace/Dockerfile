# Use the official Node.js 18 image as the base  
FROM node:20 as base

# Install most recent version of npm
RUN npm install -g npm@10.7.0
ENV NEXT_TELEMETRY_DISABLED 1

FROM base as deps

WORKDIR /usr/src/app

COPY --chown=node:node  *.json ./
COPY --chown=node:node  .nvmrc ./

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

# ENV NODE_ENV production
ENV PORT 4200
ENV HOST 0.0.0
ENV NEXT_TELEMETRY_DISABLED 1

COPY --chown=node:node  --from=build /usr/src/app/dist/apps/marketplace ./dist/apps/marketplace
COPY --chown=node:node  --from=build /usr/src/app/node_modules ./node_modules

# Set the correct permission for the prerender cache
# RUN mkdir -p .next
# RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=node:node /usr/src/app/apps/marketplace/.next/*.json ./dist/apps/marketplace/.next/
# COPY --from=builder --chown=node:node /usr/src/app/apps/marketplace/.next/BUILD_ID ./dist/apps/marketplace/.next/

USER node
EXPOSE 3000
ENV PORT 3000

WORKDIR /app/dist/apps/marketplace
CMD npm start

# FROM public.ecr.aws/docker/library/node:alpine as dependencies
# # COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.3 /lambda-adapter /opt/extensions/lambda-adapter
# WORKDIR /usr/src/app
# COPY package.json ./
# RUN npm install --only=production

# FROM public.ecr.aws/docker/library/node:alpine as runtime

# ENV NODE_ENV production
# ENV PORT 4200
# ENV HOST 0.0.0
# ENV NEXT_TELEMETRY_DISABLED 1
# WORKDIR /usr/src/app

# COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# COPY ./ ./

# RUN chown -R node:node .
# USER node
# EXPOSE 8000
# CMD [ "npm", "run", "start" ]