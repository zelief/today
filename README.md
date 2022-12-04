This is a Next.js 13 app with Tailwindcss, Jest, and Prisma.

## About the app

This app will calculate your today's score by asking simple yes or no questions about today's activity or mood. For example: "Did you work out today?" or "Did you eat healthy today?".

Because the value of activity or mood could be different from one another, each question could have a different weight to the final score.

## Getting Started

First, install the [dotenv-cli](https://www.npmjs.com/package/dotenv-cli) package:

`yarn global add dotenv-cli`

Create two databases, for the local & test environment, the DBs name is up to you. You can use any database you want as long as Prisma supported it.

Create two `.env` files, `.env.test` & `.env.local` and set the `DATABASE_URL` in each file with the corresponding [connection URLs](https://www.prisma.io/docs/reference/database-reference/connection-urls) like this:

```
# .env.local
DATABASE_URL=mysql://ziya:my_password@localhost:3306/strive
```

```
# .env.test
DATABASE_URL=mysql://ziya:my_password@localhost:3306/strive_test
```

Migrate the databases

```bash
yarn migrate
```

```bash
yarn migrate:test
```

Before you can use the app locally, you need to manually insert `questions` data first. Run `yarn studio` to run Prisma studio and insert your questions.

Run the app locally:

```bash
yarn dev
```

Run the integration tests:

```bash
yarn test
```
