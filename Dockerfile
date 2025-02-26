FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --include=optional sharp

COPY . .

RUN npx prisma generate

EXPOSE 8080

CMD ["npm", "start"]
