FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000 3001

CMD ["npm", "run", "up_stand"]