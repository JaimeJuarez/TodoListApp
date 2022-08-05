FROM node

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY package*.json ./

RUN npm ci

RUN npm install nodemon -g --quiet

COPY . .

EXPOSE 3000

CMD ["npm", "start"]