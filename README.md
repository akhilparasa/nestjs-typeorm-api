## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository for a sample project using nest.js, express.js and typeorm.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# Stand up the DB container
$ docker compose up -d

# development
$ npm run start

# watch mode
$ npm run start:dev
```

## cURL requests
### POST /package
```
curl --location --request POST 'http://localhost:3000/package' \
--header 'Content-Type: application/json' \
--data-raw '{
"name": "Service One",
"description": "Service One description."
} 
```

```
curl --location --request POST 'http://localhost:3000/package' \
--header 'Content-Type: application/json' \
--data-raw '{
"name": "Service Two",
"description": "Service Two description."
}'
```

### GET /package
```
curl --location --request GET 'http://localhost:3000/packages?page=1&take=2&search_text=one'
```

### GET /package/:id/versions
```
curl --location --request GET 'http://localhost:3000/packages/b7fda60c-e698-4570-9124-e34755cf24c0/versions?page=1&take=2&search_text=serv'
```



## Test

```bash
# unit tests
$ npm run test
```

## Design Considerations
The app was designed to run on a postgres db running on a container with Typeorm being the interface.

## Tech debt
- Write unit/integration tests.
- Use X-Idempotency-ID header to ensure POST calls are idempotent. Use an inmemory or redis cache to store Key: IdempotencyID, Value: Response with a cache expiration set to 24 hours.
- Implement jwt based auth with /auth endpoint taking in a username/pwd, returning a jwt token for authenticated users. Write a middleware to check & validate the Bearer token header value.
- Log all HTTP requests/response with modules like morgan.
- Write custom middleware for better error handling.
- Implement RBAC checks via attribute decorated controller methods.
- Return complete URI's for prev, next, first, last along with Paginated List responses.

## Test Strategy
### Unit Tests
- POST Packages returns HTTP 400 based on input payload validation rules.
- POST Packages returns HTTP 400 when Package with Name already exists.
- GET Packages returns HTTP 200 with expected response payload fields on happy path.
- GET Packages/:id/Versions returns HTTP 404 on invalid id.
- All other Routes not configured return HTTP 404

### Integration Tests
- GET Packages -> Sorting, Filtering & pagination works as expected
- GET Packages/:id/Versions -> Sorting, Filtering & pagination works as expected
- HTTP 500 error thrown when database is down, without any stack trace/sensitive information in the body (prod mode)

## License

Nest is [MIT licensed](LICENSE).
