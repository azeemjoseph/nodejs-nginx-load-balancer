const waitPort = require("wait-port");
const fs = require("fs");
const Sequelize = require("sequelize");

const {
  MYSQL_HOST: HOST,
  MYSQL_HOST_FILE: HOST_FILE,
  MYSQL_USER: USER,
  MYSQL_USER_FILE: USER_FILE,
  MYSQL_PASSWORD: PASSWORD,
  MYSQL_PASSWORD_FILE: PASSWORD_FILE,
  MYSQL_DB: DB,
  MYSQL_DB_FILE: DB_FILE,
} = process.env;

async function init_sequelize() {
  const host = HOST_FILE ? fs.readFileSync(HOST_FILE) : HOST;
  const user = USER_FILE ? fs.readFileSync(USER_FILE) : USER;
  const password = PASSWORD_FILE ? fs.readFileSync(PASSWORD_FILE) : PASSWORD;
  const database = DB_FILE ? fs.readFileSync(DB_FILE) : DB;

  await waitPort({ host, port: 3306 });

  const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: "mysql",

    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  });

  return new Promise((acc, rej) => {
    sequelize
      .sync({ force: true })
      // .authenticate()
      .then(() => {
        console.log(`Connected to mysql db at host ${HOST}`);
        acc();
      })
      .catch((err) => {
        console.error("Unable to connect to mysql database:", err);
        return rej(err);
      });
  });
}

async function shutDownServer() {
  return new Promise((acc, rej) => {
    sequelize.close((err) => {
      if (err) rej(err);
      else acc();
    });
  });
}

module.exports = {
  init_sequelize,
  shutDownServer,
};
