FROM node:14-alpine

WORKDIR /challenge_hublab

COPY ./package.json ./

# Add dockerize tool
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && apk --no-cache add --virtual builds-deps build-base python \
    && npm install \
    && npm i -g @nestjs/cli \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz 

EXPOSE 3000

CMD dockerize -wait tcp://mongodb:27017 -timeout 300s -wait-retry-interval 30s && npm rebuild bcrypt --build-from-source && npm run start:dev
