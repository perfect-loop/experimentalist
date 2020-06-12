## Install

- Install nvm (https://github.com/nvm-sh/nvm)
- Download correct version of node

`nvm use`

- Install dependencies

`(cd api && yarn install)`
`(cd client && yarn install)`
`(cd server && yarn install)`

- Start up the app (client and server)

`yarn start`


## Updating api

Bump version in `package.json`

```
cd api
yarn build
```

In the users of the api

```
yarn upgrade api
```

## Deploy

## One time setup

```
heroku git:remote -a app
heroku stack:set container
```

## Docker Locally

```
docker build . -t app
docker run -it app /bin/bash
docker run -p 3000:3000 app
```

```
open localhost:3000
```

## Push to heroku

```
heroku container:login
```

### QA

```
heroku git:remote -a iep-prod
heroku container:push web --arg ENV=qa
heroku container:release web
```

### Prod

```
heroku git:remote -a experimentalist
heroku container:push web --arg ENV=production
heroku container:release web
```

# External Services

## Mongo

https://www.mongodb.com/cloud/atlas