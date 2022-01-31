# build environment
FROM node:16-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . /app
RUN npm run build
# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY default.conf_nginx /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD nginx -g  'daemon off;'
