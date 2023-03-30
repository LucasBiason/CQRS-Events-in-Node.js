FROM node:18.0.0

COPY produtos produtos
COPY events produtos/events
WORKDIR /produtos

RUN yarn install
RUN npm run build

EXPOSE 8088
CMD [ "npm", "run", "start"]