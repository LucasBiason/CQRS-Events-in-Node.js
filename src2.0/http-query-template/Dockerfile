FROM node:18.0.0

COPY http-query-template http-query-template
WORKDIR /http-query-template

RUN yarn install
RUN npm run build

EXPOSE 8087
CMD [ "npm", "run", "start"]