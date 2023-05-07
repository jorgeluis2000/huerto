FROM node:19-alpine

LABEL com.jorge.guiza.author="Jorge Luis Güiza"

COPY "package.json" "/backend/"

COPY "package-lock.json" "/backend/"

WORKDIR /backend/

RUN npm i -E
# RUN npm install pm2 -g
COPY . .
# CMD [ "pm2-runtime", "npm", "--", "start" ]
CMD [ "npm", "start" ]