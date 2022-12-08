# build stage
FROM node:14-alpine3.16 AS build-stage
RUN npm install -g http-server
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "http-server", "dist" ]

# # build stage
# FROM node:14-alpine3.16 as build-stage
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# production stage
# FROM nginx:1.23.2-alpine as production-stage
# COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]