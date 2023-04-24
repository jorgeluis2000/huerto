FROM node:19-alpine

LABEL com.juan.author="Juan Esteban Güiza Granobles"

COPY "package.json" "/backend/"

COPY "package-lock.json" "/backend/"

WORKDIR /backend/

RUN npm install --save
# RUN npm install pm2 -g
COPY . .
# CMD [ "pm2-runtime", "npm", "--", "start" ]
CMD [ "npm", "start" ]