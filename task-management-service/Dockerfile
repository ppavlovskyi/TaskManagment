
FROM node:20

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app

EXPOSE 8081

CMD ["node", "app.js"]
