FROM node:20-alpine

WORKDIR /eaii-auth

COPY package*.json ./

RUN npm install

RUN apk add --update curl

RUN curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | VERSION=v2.24.1 sh

COPY . .

EXPOSE 4001

CMD ["npm", "run", "dev"]