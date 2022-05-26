FROM node:12.20-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

RUN mkdir -p /home/node/.cache/yarn && \
  chmod -R 0755 /home/node/.cache && \
  chown -R node:node /home/node && \
  apk --no-cache add \
  g++ gcc libgcc libstdc++ make python

USER node

CMD npm install && npm run watch