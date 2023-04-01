FROM node:18.13
WORKDIR /usr/app/client
COPY /client/package.json .
RUN npm install --quiet
COPY . .
ENTRYPOINT npm run start

FROM node:18.13
WORKDIR /usr/app/server
COPY /server/package.json .
RUN npm install --quiet
COPY . .
ENTRYPOINT npm run start