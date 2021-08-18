
if (process.env.MYSQL_HOST) module.exports = require('./sequelize-mysql');
else module.exports = require('./sequelize-postgres');