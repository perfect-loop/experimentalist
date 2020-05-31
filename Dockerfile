FROM node:14
COPY . .

# RUN apt-get update
# RUN apt-get install vim

WORKDIR /server
RUN yarn install
RUN yarn build

WORKDIR /client
RUN yarn install
RUN NODE_ENV=production yarn build
RUN cp -r build ../server/build/public
RUN rm -rf node_modules

WORKDIR /server
EXPOSE 3000
ENV PORT 3000
CMD ["node_modules/pm2/bin/pm2", "start", "./build/index.js", "--no-daemon"]