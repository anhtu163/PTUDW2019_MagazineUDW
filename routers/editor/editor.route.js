var express = require('express');
var cate = require('../../models/category.model');
var news = require('../../models/news.model');
var auth = require('../../middlewares/auth');
var router = express.Router();

router.get('/',auth,(req, res)=>{
    if(req.user.Role == 3){
        res.render('admin_home', {
            layout: 'editor.main.hbs',
            layoutsDir: 'views/_layouts'
        });
    }
    else{
        res.redirect('/');
    }
    
})

router.get('/detailConfirm',(req, res)=>{
    res.render('editor/detailConfirmPostingView',{
        layout: 'admin.main.hbs',
            layoutsDir: 'views/_layouts'
    });
})

router.get('/confirm',(req, res, next)=>{
    //Lọc bài chưa duyệt theo cat = 3
    var p = news.newsByStatus(2);
    //Lọc bài chưa duyệt
    //var p = news.newsByStatus(2);
    p.then((row)=>{

        res.render('editor/confirmPostingView', {
            post: row,
            layout: 'editor.main.hbs',
            layoutsDir: 'views/_layouts'
        })
    }).catch(err => {
        console.log(err);
    });
    
})

router.get('/confirm/:id', (req, res, next)=>{
    var id = req.params.id;
    var p = news.detail(id);
    var p2 = cate.all();
    Promise.all([p,p2]).then(([row, row2])=>{
        if(p.IsPublish!==1)
        {
            res.render('editor/detailConfirmPostingView', {
                detail: row,
                category: row2,
                layout: 'editor.main.hbs',
                layoutsDir: 'views/_layouts'
            })
        }
        
    }).catch(err => {
        console.log(err);
    });
})

router.post('/confirm/:id', (req, res, next)=>{
    var id = req.params.id;

    var entity = {
        PostID: id,
        IsPublish: req.body.status,
        CatID: req.body.select,
        Date: req.body.datePublish
    }
    news.updateNews(entity);
    var p = news.newsByStatus(2);
    //Lọc bài chưa duyệt
    //var p = news.newsByStatus(2);
    p.then((row)=>{

        res.render('editor/confirmPostingView', {
            post: row,
            layout: 'editor.main.hbs',
            layoutsDir: 'views/_layouts'
        })
    }).catch(err => {
        console.log(err);
    });
    
});

module.exports = router; 