# multi-stage build; NODE_ENV=production doesn't install dev dependencies
FROM node:latest

WORKDIR /home/node/gol

RUN mkdir -p /home/node/gol/node_modules && chown -R node:node /home/node/gol

COPY --chown=node:node package*.json ./

RUN npm install --legacy-peer-deps
RUN npm install -g serve

COPY --chown=node:node . .

RUN npm run-script build

ENV NODE_ENV=production

COPY --chown=node:node package*.json ./

RUN npm install --legacy-peer-deps

USER node

EXPOSE 5000

CMD ["serve", "-s", "build"]
