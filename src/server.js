const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('../database/database');
const categorysController = require('../categorys/categorysController');
const articlesController = require('../articles/articlesCotroller');
const Article = require('../articles/Article');
const Category = require("../categorys/category");

app.set('views', '../views');
app.set('view engine', 'ejs');

connection.authenticate().then(()=>{
    console.log(":D");
}).catch((err) =>{
    console.log(err);
})




//Config BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.use("/", categorysController);
app.use("/", articlesController);

app.listen(8181, function (err) {
    console.log("servidor aberto")
})