module.exports = {
  development: {
      client: 'pg',
      connection: {
        database: "g96q4",
        host: "testinstance.cx60kjmtucna.us-east-2.rds.amazonaws.com",
        user: "xella0",
        password: "g96q4qweasdzxc"
      },
      migrations: {
          directory: __dirname + '/db/migrations',
        },
      seeds: {
          directory: __dirname + '/db/seeds',
        },
    },
  production: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
          directory: __dirname + '/db/migrations',
        },
      seeds: {
          directory: __dirname + '/db/seeds/production',
        },
    },
};
