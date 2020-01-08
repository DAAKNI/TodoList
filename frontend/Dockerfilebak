 FROM node:lts-slim

 WORKDIR /app/

 # Install dependicies
COPY package.json yarn.lock /app/

RUN npm install

 # Add frontend code
COPY . /app/

EXPOSE 3000

CMD npm start

 
 
