FROM node:14

RUN mkdir -p /src

COPY ./ride_service/ /src/app

COPY ./shared /src/shared

RUN cd /src/app/ && npm i

EXPOSE 3001
CMD ["npm", "run", "--prefix", "./src/app", "start"]