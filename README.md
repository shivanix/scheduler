# Interview Scheduler

Interview Scheduler is an interview appointment acheduling tool. It is a responsive, single-page web app built using React.

!["App demo"](https://raw.githubusercontent.com/shivanix/scheduler/master/docs/demo.gif)

Technologies used include [React](https://reactjs.org/), [SASS](https://sass-lang.com/), [WebPack](https://webpack.js.org/), [Babel](https://babeljs.io/), [Axios](https://www.npmjs.com/package/axios) client-side, [Node.js](https://nodejs.org), [Express](https://expressjs.com), [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), [Postgres](https://postgresql.org) server-side, and [Storybook](https://storybook.js.org/), [Testing Library](https://testing-library.com/), [WebPack Dev Server](https://github.com/webpack/webpack-dev-server), [Jest](https://jestjs.io/), and [Cypress](https://www.cypress.io/) for development and testing.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
cd <project-directory>/scheduler
npm start
```

## Running Storybook Visual Testbed

```sh
cd <project-directory>/scheduler
npm run storybook
```

## **Testing**

### **Database Setup/API Server Setup**

Execute the following to set up Interview Scheduler API server:

```sh
cd <project-directory>
git clone https://github.com/shivanix/scheduler-api
cd scheduler-api
npm install
```
(If needed for the next step; Install [Postgres](https://www.postgresql.org).)

Log into Postgres as a user with superuser privileges.  For example:

```sh
sudo -u postgres psql
```

Execute the following to set up the test database and populate it with data:

```postgres
CREATE USER scheduler_test WITH NOSUPERUSER PASSWORD 'test';
CREATE DATABASE scheduler_test OWNER scheduler_test;
GRANT ALL ON DATABASE scheduler_test TO scheduler_test;
\c scheduler_test
\i src/db/schema/create.sql
\i src/db/schema/test.sql
-- Use this to verify the data:
SELECT * FROM days JOIN appointments ON appointments.day_id = days.id;
```

### API Server Setup

Run the API server in test mode:

```sh
cd <project-directory>/scheduler-api
npm run test:server
```

## Running Jest Test Framework

```sh
cd <project-directory>/scheduler
npm test
```

## Running Cypress Test Framework
(install Cypress [npm install -g cypress] if required)

Make sure you are running the API server in test mode with the appropriate data

```sh
cd <project-directory>/scheduler
npm run cypress
```

Click individual specs from the Tests pane in the Cypress window.
