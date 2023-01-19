# Vite PERN Browser Boilerplate

A simple boilerplate for the PERN stack using Vite.js. It includes Node-Postgres v8.8, Express, React 18, React Router DOM v6.6, Morgan, Axios, jsonwebtoken, bcrypt, dotenv, and Nodemon.

This boilerplate was made using the official [Vite](https://vitejs.dev) template(`npm create vite@latest my-app -- --template react`) for the client. Then, the backend was built around it. You can find more templates to scaffold your project using Vite, [here](https://github.com/vitejs/vite/tree/main/packages/create-vite) or community templates on [Awesome Vite.js](https://github.com/vitejs/awesome-vite#templates).

## Tools

- [Vite](https://vitejs.dev)
- [React](https://reactjs.org/)
- [Node-Postgres](https://node-postgres.com/)
- [Express](https://expressjs.com/)
- [React Router DOM](https://reactrouter.com/en/main)
- [Axios](https://axios-http.com/docs/intro)
- [Morgan](https://www.npmjs.com/package/morgan)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Nodemon](https://www.npmjs.com/package/nodemon)

## Installation

```bash
npx degit seanhagstrom/Vite-PERN my-app
```

```bash
cd my-app
cd client && npm install
cd .. && npm install
npm run start:dev
```

> The above installation should remove the `.git` history. If it didn't run the following script:

```bash
rm -rf .git
```

> Once the `.git` history has been erased, initialize the project as a git repository with the following command:

```bash
git init
```

> Before you run `npm run seed`, you'll need to create your database in `psql`. You can do this from the CLI with the following command:

```bash
createdb your_database_name
```

Happy coding!
