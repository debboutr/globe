FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
COPY ./ .
RUN npm i
RUN npm run build

FROM httpd:2.4 as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /usr/local/apache2/htdocs
#COPY nginx.conf /etc/nginx/nginx.conf

