FROM node:14

RUN mkdir -p /src

COPY ./gateway/ /src/app

COPY ./shared /src/shared

RUN cd /src/app/ && npm i

EXPOSE 3000
CMD ["npm", "run", "--prefix", "./src/app", "start"]