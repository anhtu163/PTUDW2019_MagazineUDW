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

module.exports = router;