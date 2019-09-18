const Sequelize = require('sequelize');

const config = require('./config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,//链接最大值
        min: 0,//链接最小值
        idle: 30000,//闲时超时
    }
});

module.exports = sequelize;