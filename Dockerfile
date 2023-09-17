FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmjs.org/

RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm" ,"start"]