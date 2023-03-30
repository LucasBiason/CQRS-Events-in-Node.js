FROM node:18.0.0

COPY events-handler events-handler

COPY ./config/pulsar_install.sh .
RUN ./pulsar_install.sh

WORKDIR /events-handler

RUN npm install
RUN npm run build

EXPOSE 3009
CMD [ "npm", "run", "start"]