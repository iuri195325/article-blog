const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const categorysController = require('./categorys/categorysController');
const articlesController = require('./articles/articlesCotroller');
const Article = require('./articles/Article');
const Category = require("./categorys/category");

connection.authenticate().then(()=>{
    console.log(":D");
}).catch((err) =>{
    console.log(err);
})


//Config EJS
app.set('view engine','ejs');
app.use(express.static('public'));

//Config BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.use("/", categorysController);
app.use("/", articlesController);

app.listen(8182, function (err) {
    console.log("servidor aberto")
})