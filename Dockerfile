FROM node:12
COPY . .

RUN yarn install
RUN NODE_ENV=production yarn build
RUN cp -r build/* server/public

WORKDIR /server
RUN yarn install
RUN yarn build

EXPOSE 3000
ENV PORT 3000
CMD ["node_modules/pm2/bin/pm2", "start", "./build/index.js", "--no-daemon"]