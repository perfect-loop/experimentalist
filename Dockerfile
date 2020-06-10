FROM mhart/alpine-node:14
COPY . .

ARG ENV
# RUN apt-get update
# RUN apt-get install vim

WORKDIR /server
RUN yarn install
RUN yarn build

WORKDIR /client
RUN yarn install
WORKDIR /client
RUN node_modules/.bin/env-cmd -f .env.$ENV ./node_modules/.bin/react-scripts build

RUN cp -r build ../server/build/public
RUN rm -rf node_modules

WORKDIR /server
EXPOSE 3000
ENV PORT 3000
CMD ["node_modules/pm2/bin/pm2", "start", "./build/index.js", "--no-daemon"]