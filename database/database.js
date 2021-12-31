const Sequelize = require('sequelize');
const connection = new Sequelize('blog','root','2254aabb',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;