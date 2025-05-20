FROM node:18-alpine

USER root

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

USER node

EXPOSE 8080

CMD [ "npm", "start" ]