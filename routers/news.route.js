var express = require('express');

var newsModel = require('../models/news.model');

var router = express.Router();

router.get('/:id/post',(req,res)=>{
    var Id = req.params.id;
    console.log(Id);
    newsModel.detail(Id)
    .then(rows=>{
        res.render('image-post',{
            news: rows
        });
    }).catch(err=>{
        console.log(err);
        res.end('error occured');
    });
})

router.get('/:id/category', (req, res) => {
    var Id = req.params.id;
    //console.log(Id);
    newsModel.newsByCat(Id)
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
        });
})


module.exports = router;