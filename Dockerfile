FROM node:10.16.0-alpine AS build_stage

ARG api_url

WORKDIR /app

COPY . .

RUN npm i && VUE_APP_API_URL=$api_url npm run build

FROM nginx:1.17.0

COPY --from=build_stage /app/dist/ /usr/share/nginx/html

RUN sed -i '10 a try_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf

EXPOSE 80
