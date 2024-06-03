FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=6500

ENV MODEL_URL= 

CMD ["npm", "start"]