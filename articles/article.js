const Sequelize = require('sequelize');
const connection = require('../database/database');
const Categorys = require("../categorys/category")

const Article = connection.define('Aticles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Categorys.hasMany(Article);
Article.belongsTo(Categorys);

//Article.sync({force: true});
module.exports = Article;