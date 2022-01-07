const express = require('express');
const router = express.Router();
const Category = require('../categorys/category');
const Article = require('../articles/article');
const slugify  = require('slugify');

router.get('/home', (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC'],
        ]
    }).then(articles => {
        Category.findAll().then(category => {
            res.render('index', { articles: articles, category: category});
        });
    });
});

router.get('/artigos/:id', (req, res) => {
    var id = req.params.id;
    Article.findAll({
        where: { id: id }
    }).then(articles => {
        Category.findAll().then(category => {
            res.render('artigos', { articles: articles, category: category});
        });
    });
});

router.get('/artigos/category/:slug', (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: { slug: slug },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
           Category.findAll().then(categorys => {
               res.render('artigoCategory', { article: category.Aticles, category: categorys });
           });
        }else{
            res.send("deu erro mano kk");
        }
    })
});


router.get('/articles', (req, res) =>{
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        res.render("articles/index", {articles: articles});
    })
    
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

router.post('/admin/article/delete', (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if(!isNaN(id)) {
            Article.destroy({ 
                where: { id: id }
            }).then(() => {
                res.redirect('/articles');
            })
        }else{
            res.redirect('/articles');
        }
    }else{
        res.redirect('/articles');
    }
});



module.exports = router;