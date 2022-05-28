FROM node:14.17.0-alpine as builder
ARG env_conf
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
COPY ./.env.$env_conf /app/.env
RUN npm run build

FROM nginx:1.17-alpine as runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
