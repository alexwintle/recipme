FROM node:20-alpine

ENV CI=true \
    EXPO_NO_DOTENV=true \
    EXPO_NON_INTERACTIVE=true

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .