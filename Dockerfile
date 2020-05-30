FROM node:14
COPY . .

WORKDIR /client
RUN yarn install
RUN NODE_ENV=production yarn build
RUN mv build ../server

# RUN apt-get update
# RUN apt-get install vim

WORKDIR /server
RUN yarn install
RUN yarn build

EXPOSE 3000
ENV PORT 3000
CMD ["node_modules/pm2/bin/pm2", "start", "./build/index.js", "--no-daemon"]