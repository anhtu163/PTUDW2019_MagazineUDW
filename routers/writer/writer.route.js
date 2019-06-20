var express = require('express');
var cate = require('../../models/category.model');
var news = require('../../models/news.model');
var auth = require('../../middlewares/auth');




var router = express.Router();

router.get('/',auth,(req, res)=>{

    if (req.user.Role == 2) {
        res.render('admin_home', {
            layout: 'writer.main.hbs',
            layoutsDir: 'views/_layouts'
        });
    } else {
        res.redirect('/');
    }
})

router.get('/posting',(req, res, next)=>{
    var p = cate.all();
    p.then((row)=>{

        res.render('writer/postingView', {
            category: row,
            layout: 'writer.main.hbs',
                layoutsDir: 'views/_layouts'
        })
    }).catch(err => {
        console.log(err);
    });
    
})
router.post('/posting', (req, res, next)=>{
    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
     var post = {
        Title: req.body.titleInput,
        Date: today,
        IsPublish: 2,
        CatID: req.body.select,
        ViewNum: 0,
        SumContent: req.body.sumContent,
        CreatorID: req.user.ID,
        Avatar: req.user.avatar,
        //Content: req.body.content.innerHTML
        Content: req.body.trick
     }
    news.addNews(post);
    console.log(post.Content);
    res.render('writer/postingView',{
        layout: 'writer.main.hbs',
            layoutsDir: 'views/_layouts'
    });

})

router.get('/postlist/:id',(req, res, next)=>{
    var id = req.params.id;
    var p = news.all();
    var p2 = news.newsByStatus(id);
    Promise.all([p,p2]).then(([row, row2])=>{
        res.render('writer/postListView', {
            new: row,
            newStt: row2,
            layout: 'writer.main.hbs',
                layoutsDir: 'views/_layouts'
        })
    }).catch(err => {
        console.log(err);
    });
})

router.get('/editpost/:id', (req, res, next)=>{
    var id = req.params.id;
    var p = news.detail(id);
    var p2 = cate.all();
    Promise.all([p,p2]).then(([row, row2])=>{
        if(p.IsPublish!==1)
        {
            res.render('writer/editPostingView', {
                detail: row,
                category: row2,
                layout: 'writer.main.hbs',
            layoutsDir: 'views/_layouts'
            })
        }
        
    }).catch(err => {
        console.log(err);
    });
})

router.post('/editpost/:id', (req, res, next)=>{
    var id = req.params.id;
    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
    var entity = {
        PostID: id,
        Title: req.body.title,
        Date: today,
        Avatar: req.body.avatar,
        IsPublish: 2,
        CatID: req.body.select,
        SumContent: req.body.sumContent,
        Content: req.body.trick,
        ViewNum: 0,
        CreatorID: 1
    }
    news.updateNews(entity);
    console.log(entity);
    res.redirect("/writer/postlist/2");
   
});



module.exports = router; 