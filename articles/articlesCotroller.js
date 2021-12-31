const express = require('express');
const router = express.Router();
const Category = require('../categorys/category');
const Article = require('../articles/article');
const slugify  = require('slugify');

router.get('/articles', (req, res) =>{
    res.send("rota deArtigos");
});

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(category => {
        res.render('articles/new',{ category: category});
    })
    
});

router.post('/admin/article/save', (req, res) => {
    var title = req.body.title
    var body = req.body.body;
    var category = req.body.category
    Article.create({ 
        title: title,
        body: body,
        slug: slugify(title),
        CategoryId: category
    }).then(() => {
            res.redirect('/articles');
        })
    
})


module.exports = router;