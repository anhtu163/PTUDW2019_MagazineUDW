var express = require('express');

var newsModel = require('../models/news.model');
var categoryModel = require('../models/category.model')

var router = express.Router();

router.get('/:id/post',(req,res)=>{
    var Id = req.params.id;
    //console.log(Id);
    newsModel.detail(Id).then(rows=>{
        categoryModel.all().then(row2s=>{
            res.render('image-post', {
                news: rows,
                category: row2s
            });
        }).catch(err => {
            console.log(err);
            res.end('error occured');
        
    }).catch(err=>{
        console.log(err);
        res.end('error occured');
    });
    })
})

router.get('/:id/category', (req, res) => {
    var Id = req.params.id;
    //console.log(Id);
    var p1 = newsModel.newsByCat(Id);
    var p2 = categoryModel.catById(Id);
    var p3 = categoryModel.all();
    Promise.all([p1,p2,p3]).then(([rows,row1s,row2s])=>{
        res.render('newsByCat', {
            news: rows,
            category1: row1s,
            category:row2s
        });
    }).catch(err => {
        console.log(err);
        res.end('error occured');
    });
    /*newsModel.newsByCat(Id)
        .then(rows => {
            categoryModel.catById(Id)
                .then(row1s => {
                    res.render('newsByCat', {
                        news: rows,
                        category: row1s

                    });

                }).catch(err => {
                    console.log(err);
                    res.end('error occured');
                });
            
        }).catch(err => {
            console.log(err);
            res.end('error occured');
        });*/
})



module.exports = router;