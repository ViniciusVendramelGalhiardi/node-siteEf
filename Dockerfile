FROM node:12-alpine
WORKDIR /usr/src/app

COPY package.json .env ./
RUN yarngcloud auth login

COPY . .

RUN yarn build

COPY . .

EXPOSE 3000

CMD ["yarn", "start", "--host", "0.0.0.0", "--port", "3000"]