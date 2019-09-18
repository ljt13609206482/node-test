const Sequelize = require('sequelize');
const sequelize = require('../sequelize-object');

var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
        timestamps: false
    });

var fn_index = async (ctx, next) => {
    var pets = await Pet.findAll({
        where: {
            name: 'Gaffey'
        }
    });
    ctx.response.body = pets
};

module.exports = {
    'GET /': fn_index
};