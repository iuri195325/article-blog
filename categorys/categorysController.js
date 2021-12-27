const express = require('express');
const router = express.Router();
const Category = require('../categorys/category')
const slugify = require('slugify');

router.get('/admin/categorys/new', (req, res) => {
    res.render("categorys/new");
});
router.get('/admin/categorys', (req, res) => {
    Category.findAll().then((category) => {
        res.render("categorys/index", {category: category});
    });
});

router.post('/categorys/save', (req, res) => {
    var title = req.body.title;
    if(title != undefined) {

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categorys");
        })
    }else{
        res.redirect("/");
    }
});


router.post('/admin/category/delete', (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if(!isNaN(id)) {
            Category.destroy({ 
                where: { id: id }
            }).then(() => {
                res.redirect('/admin/categorys');
            })
        }else{
            res.redirect('/admin/categorys/new');
        }
    }else{
        res.redirect('/admin/categorys/new');
    }
});


router.get('/category/edit/:id', (req, res) => {
    var id = req.params.id;
    if(isNaN(id)){
        res.send(404);
    }else{

    
        Category.findOne({where: {id: id}}).then(category => {
            if(category != undefined){
                res.render("categorys/edit", {category:category});
            }else{
                res.send(404);
            }
        })
        
    }
})

router.post('/category/edit/save', (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    Category.update({ title: title, slug: slugify(title) }, {
        where: { id: id }
    }).then(() => {
        res.redirect('/admin/categorys');

    })
    
});


module.exports = router;