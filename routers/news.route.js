var express = require('express');

var newsModel = require('../models/news.model');
var categoryModel = require('../models/category.model')

var router = express.Router();

router.get('/:id/post',(req,res,next)=>{
    var Id = req.params.id;
    var p = newsModel.detail(Id);
    var p1 = categoryModel.all();
    var p2 = newsModel.addView(Id);
    var p3 = newsModel.newsByBestViewNum();
    var p4 = newsModel.newsOrderByViewNum();
    
    Promise.all([p,p1,p2,p3,p4]).then(([rows,row1s,row2s,row3s,row4s])=>{
        
        res.render('image-post', {
            news: rows,
            category: row1s,
            viewNum :row2s,
            bestView: row3s,
            view: row4s
        });
    }).catch(next);
    //console.log(req.body.Title);
});



router.get('/:id/category', (req, res,next) => {
    var Id = req.params.id;
    //console.log(Id);
    
    var p2 = categoryModel.catById(Id);
    var p3 = categoryModel.all();
    
    var pageNum = req.query.page || 1;
    if(pageNum < 1){
        pageNum = 1;
    }
    var limit = 1;
    var offset = (pageNum - 1)*limit;


    
    var p4 = newsModel.pageByCat(Id,limit,offset);
    var p1 = newsModel.countByCat(Id);
    

    Promise.all([p1,p2,p3,p4]).then(([rows,row1s,row2s,row3s])=>{

        var pages = [];
        var total = rows[0].total;
        var nPages = Math.floor(total/limit);
        if(total%limit > 0) nPages++;

        
        for(i=1;i<=nPages;i++)
        {
            var active = false;
            if(+pageNum === i) active = true;
            var obj = {
                value: i,
                active
            };
            pages.push(obj);
        }

        res.render('newsByCat', {
            news: row3s,
            category1: row1s,
            category:row2s,
            pages

        });
    }).catch(next);
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