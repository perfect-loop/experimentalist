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

After updating models in the api, 

```
cd api
yarn build
```

Upgrade both client and server

```
cd client
yarn upgrade api
```

```
cd server
yarn upgrade api
```

Restart the servers

## Component development

There are a few part to each component that can be loosely defined as 

1. View - only presentations (as much as possible)
2. Storage - data retrival/storage

Example:

```
src
|-- components
  |----- Events
     |-------Index
        |-------index.tsx
     |------- storage
        |------ ParticipantsStore.ts
```

Will contain all the logic to show all events. It will generally look like this?

```

interface IState {
  participationsStore: ParticipantsStore;
}

@observer // needed to make sure 
export default class Index extends Component<IProps, IState> {
  constructor(props: {}) {
    // required
    super(props);

    // initialize storage
    const participationsStore = new ParticipantsStore();
    this.state = {
      participationsStore: participationsStore,
    };

    // get data from server if needed
    participationsStore.get();
  }

  public render() {
    switch (props.participationsStore.state.kind) {
    case "not_ready":
      return <div>Still loading</div>;
    case "ready":
      return <div>Show useful info about props.participationsStore</>;
    }
  }
}
```

Corresponding store will be 

```
export default class ParticipantsStore {
  // @observable is required to indicate that the view will need to re-render if this var changes
  @observable public participations: IParticipation[];
  @observable public state: "not_ready" | "ready" | "error";

  private eventId: string;

  constructor() {
    // variable that will store results once they are fetched from API
    this.participations = [];

    // state to indicate what the store is doing now
    this.state = "not_ready";

    // other variables
    this.eventId = eventId;
  }
  
  // @action indicates that it will update the state of the storage and view will need to trigger a re-render
  @action
  public get = () => {
    const client = new Api({});
    client
      .get<IParticipation[]>(`/api/events/${this.eventId}/participants.json`)
      .then((response: AxiosResponse<IParticipation[]>) => {
        const { data } = response;
        this.participations = data;
        this.state = "ready";
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.statusText);
      });
  };
}
```

## Data Models

To make sure that all latest Mongoose indeces are used, do this

```
Model.syncIndexes()
```

## Deploy

## One time setup

```
heroku git:remote -a iep-prod
heroku stack:set container
```

## Docker Locally

```
docker build --build-arg ENV=qa . -t app
docker run -e NODE_ENV=production -it app sh
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

## Debugging

```
DEBUG=enine,socket.io* yarn start
```

## Server

```
yarn dev
```

Open in Chrome

```
chrome://inspect
```