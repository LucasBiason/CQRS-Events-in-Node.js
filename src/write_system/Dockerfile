FROM node:18.0.0

RUN mkdir events
COPY ./events events

COPY ./config/newrelic_install.sh .
RUN bash && NEW_RELIC_API_KEY=NRAK-ZSZOSUHTW3S6ZWYQ9QKPND30D8N NEW_RELIC_ACCOUNT_ID=3582910 ./newrelic_install.sh -n logs-integration

COPY ./config/pulsar_install.sh .
RUN ./pulsar_install.sh

COPY write_system write_system
COPY events write_system/events
WORKDIR /write_system

RUN yarn install
RUN npm run build

EXPOSE 5000
CMD [ "npm", "run", "start"]