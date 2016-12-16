Simple test project: allow patients to apply for clinical trials.
Consists of web page with application form and REST API to store applications.

## Requirements
Project is built with Node 7.1.0 and requires [Yarn](https://yarnpkg.com/) to be installed.
Postgres 9.6.1 is used to store data.

## Configuration
App is conigured using following environment variables:

* `PORT` - TCP port on which to start application; optional. Default is 8080.
* `DB_URL` - database URL; required. Example: `postgres://postgres:postgres@localhost:5432/trials_applications`.

## Building And Running

1. **Clone project source code**
  Run `git clone https://github.com/evvvvr/clinical-trials.git <project directory>` command.

2. **Install dependencies**
  Run `yarn` command in project directory.

3. **Update database schema**
  Run `yarn db-migrate` command in project directory.
  Requires `DB_URL` env variable to be set.

4. **Test REST API**
  Run `yarn test-server` command in project directory.

5. **Run Application**
  Run `yarn start` command in project directory.
  App will be available on http://localhost:8080 address by default.

## Running Postgres with docker-compose

To use docker-compose for running Postgres server:

1. Create 'docker-compose.yml' file with following content:

  ```yml
  version: '2'

  volumes:
    postgres-data:
      driver: local

  services:
    postgres:
      image: postgres:9.6.1
      ports:
        - 5432:5432
      expose:
        - 5432
      volumes:
        - ./db/dumps:/db/dumps
        - ./tmp:/tmp
        - ./bin/restoredb:/bin/restoredb:ro
        - ./bin/dumpdb:/bin/dumpdb:ro
        - postgres-data:/var/lib/postgresql/data
      environment:
        POSTGRES_USER: postgres
        POSTGRES_PASSWORD: postgres
  ```

2. Run `docker-compose up` command in same directory with `docker-compose.yml` to start
Postgres container.

3. Run `docker exec -it <container name> createdb -h localhost -U postgres trials_applications` command
to create `trials_applications` database. Use `docker ps` command to find container`s name.

4. Run `docker-compose stop` command to stop Postgres container.