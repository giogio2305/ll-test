const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize('geo', 'moo', 'Db12345678', {
  host: '127.0.0.1',
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