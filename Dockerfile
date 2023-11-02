FROM node:alpine as build

WORKDIR /app

COPY package*.json .

RUN npm config set registry https://registry.npmjs.org/

RUN npm config set strict-ssl false

RUN npm i

COPY . .

RUN npm run build

# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx:1.21.6-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh


# FROM nginx:1.21

# COPY --from=build /app/build /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

