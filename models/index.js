const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./users.model.js")(sequelize, Sequelize);
db.savings = require("./savings.model.js")(sequelize, Sequelize);
db.bills = require("./bills.model.js")(sequelize, Sequelize);
db.debts = require("./debts.model.js")(sequelize, Sequelize);
db.incomes = require("./incomes.model.js")(sequelize, Sequelize);
module.exports = db;
