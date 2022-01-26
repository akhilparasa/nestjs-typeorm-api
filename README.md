<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

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

## Test

```bash
# unit tests
$ npm run test
```

## Design Considerations
The app was designed to run on a postgres db running on a container with Typeorm being the interface.
For simplicity, Services layer

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
