FROM node:20-bullseye-slim as build

WORKDIR /app

COPY package*.json .

RUN npm config set registry https://registry.npmjs.org/

RUN npm config set strict-ssl false

RUN npm i

COPY . .

RUN npm run build

FROM nginx:1.21

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

