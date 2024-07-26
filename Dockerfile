FROM alpine:3.11

WORKDIR /app

COPY . .

ENV PATH /app/node_modules/.bin:$PATH

RUN apk add --no-cache nodejs npm

RUN npm install

CMD ["npm","start"]