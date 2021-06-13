FROM node:alpine
WORKDIR /usr/healthy-living
COPY package.json .
RUN npm install
RUN npm install typescript -g
COPY . .
RUN sh -c tsc
CMD ["node", "build/app.js"]
EXPOSE 8080