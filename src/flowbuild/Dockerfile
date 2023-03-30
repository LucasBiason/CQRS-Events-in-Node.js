FROM node:16.15.0 as base

COPY ./config/newrelic_install.sh .
RUN bash && NEW_RELIC_API_KEY=NRAK-ZSZOSUHTW3S6ZWYQ9QKPND30D8N NEW_RELIC_ACCOUNT_ID=3582910 ./newrelic_install.sh -n logs-integration

COPY flowbuild flowbuild
WORKDIR /flowbuild

RUN npm install
RUN npm install knex -g
RUN npm install nodemon -g

EXPOSE 3000

CMD ["nodemon", "src/server.js"]
