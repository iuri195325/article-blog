const express = require('express');
const router = express.Router();
const Category = require('../categorys/category')
const slugify = require('slugify');

router.get('/admin/categorys/new', (req, res) => {
    res.render("admin/categorys/new");
});
router.get('/admin/categorys', (req, res) => {
    Category.findAll().then((category) => {
        res.render("admin/categorys/index", {category: category});
    });
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

router.post('/category/save', (req, res) => {
    var title = req.body.title;
    if(title != undefined) {

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() =>{
            res.redirect("/admin/categorys");
        })
    }else{
        res.redirect("/");
    }
});


module.exports = router;