# About

This is a mockup of a booking systems, it uses [typescript](https://www.typescriptlang.org/), [apollo graphql](https://www.apollographql.com/) , [react](https://reactjs.org/), [styled-components](https://www.styled-components.com/), [styled-systems](https://styled-system.com/) and [leaftlet](https://leafletjs.com/).

The properties are saved on an [Sqlite](https://github.com/mapbox/node-sqlite3) database and the location is mocked based on the distance of the property and on the browser location.

## Running

After running trhough one of the methods below:

- front end should be on http://127.0.0.1:3000
- The bookings list public api should be on http://127.0.0.1:4000/bookings
- The use booking api should be on http://127.0.0.1:4000/users/1/bookings
- The graphiql playground will be on http://127.0.0.1:5000

### Trough docker-compose

```shell
docker-compose up
```

### Trough node directly

On one terminal do

```shell
cd api
npm install
npm start
```

On another terminal do

```shell
cd front
npm install
npm start
```

### Running backend tests

```shell
cd api
npm run test
```
