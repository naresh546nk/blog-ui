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
# COPY env.sh /docker-entrypoint.d/env.sh
# RUN chmod +x /docker-entrypoint.d/env.sh



# Default port exposure
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]

