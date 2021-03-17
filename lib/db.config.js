const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize('nr1yMXpPIx', 'nr1yMXpPIx', '12PoO0Gpxn', {
  host: 'remotemysql.com',
  port: 3306
  dialect: 'mysql',
  operatorsAliases: 0,
 
  pool: {
    max: env.max,
    min: env.min,
    acquire: env.acquire,
    idle: env.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.Vehicules = require('./vehicules.model.js')(sequelize, Sequelize);
db.Reparateurs = require('./reparateurs.model.js')(sequelize, Sequelize);
module.exports = db;
