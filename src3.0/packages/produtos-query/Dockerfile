FROM node:18.0.0

COPY produtos-query produtos-query
WORKDIR /produtos-query

RUN yarn install
RUN npm run build

EXPOSE 8087
CMD [ "npm", "run", "start"]