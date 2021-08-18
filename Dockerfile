FROM node:14-alpine
RUN apk add --no-cache python g++ make
WORKDIR /Nodejs-Expressjs-Sequelize
COPY . .
RUN yarn install --production
CMD [ "npm", "server.js"]
