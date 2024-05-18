
FROM node:20

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app

EXPOSE 8080

CMD ["node", "app.js"]