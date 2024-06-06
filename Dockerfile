FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=6500

ENV MODEL_URL=https://storage.googleapis.com/capstone_buckets_lettuce/model.json

CMD ["npm", "start"]