FROM node:16.15.0 as base

COPY flowbuild flowbuild
WORKDIR /flowbuild

RUN npm install
RUN npm install knex -g
RUN npm install nodemon -g

EXPOSE 3000

CMD ["nodemon", "src/server.js"]
