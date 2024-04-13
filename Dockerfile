# syntax=docker/dockerfile:1
FROM node:18-alpine3.18
WORKDIR /usr/server/app

# Docker Layer Caching
COPY ./package.json ./

RUN yarn
COPY ./ .
# will build remix app
RUN yarn build
ENV NODE_ENV=production
ENV DATABASE_URL="file:./dev.db"

EXPOSE 3000
CMD ["yarn" ,"start"]