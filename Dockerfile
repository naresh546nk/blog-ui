FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmjs.org/

RUN npm i

COPY . .

EXPOSE 8080

CMD ["npm" ,"start"]