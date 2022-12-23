FROM node:19-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY src src
COPY tsconfig.json tsconfig.json
COPY tsconfig.build.json tsconfig.build.json
COPY nest-cli.json nest-cli.json

RUN npm run build
