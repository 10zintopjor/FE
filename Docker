FROM node:17-alpine
WORKDIR /app
COPY package*.json /app
RUN npm i --silent
RUN npm i -g react-scripts@5.0.0
RUN npm install react-slick slick-carousel
COPY . ./

CMD ["npm","start"]
