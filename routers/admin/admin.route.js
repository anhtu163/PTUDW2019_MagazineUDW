var express = require('express');
var cate = require('../../models/category.model');
var news = require('../../models/news.model');
var userModel = require('../../models/user.model');
var auth = require('../../middlewares/auth');
var router = express.Router();


router.get('/',auth,(req, res)=>{
    if(req.user.Role == 4)
    {
        res.render('admin_home', {
        layout: 'admin.main.hbs',
        layoutsDir: 'views/_layouts'
        });
    }
    else{
        res.redirect('/');
    }
    
})

router.get('/confirm',(req, res)=>{
    //Lọc bài chưa duyệt theo cat = 3
    var p = news.all();
    //Lọc bài chưa duyệt
    //var p = news.newsByStatus(2);
    p.then((row)=>{
        res.render('admin/confirmPostingView', {
            post: row,
            layout: 'admin.main.hbs',
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
            res.render('admin/detailConfirmPostingView', {
                detail: row,
                category: row2,
                layout: 'admin.main.hbs',
                layoutsDir: 'views/_layouts'
                // layout: 'admin.main.hbs',
                // layoutsDir: 'views/_layouts'
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
    //Lọc bài chưa duyệt
    //var p = news.newsByStatus(2);
    var p = news.all();
    p.then((row)=>{

        res.render('admin/confirmPostingView', {
            post: row,
      
            layout: 'admin.main.hbs',
            layoutsDir: 'views/_layouts'
        })
    }).catch(err => {
        console.log(err);
    });
});

router.get('/delete/:id', (req, res, next)=>{
    var id = req.params.id;
    news.deleteNews(id);
    var p = news.all();
    //Lọc bài chưa duyệt
    //var p = news.newsByStatus(2);
    p.then((row)=>{

        res.render('admin/confirmPostingView', {
            post: row,
            layout: 'admin.main.hbs',
            layoutsDir: 'views/_layouts'
        })
    }).catch(err => {
        console.log(err);
    });
});


router.get('/employee',(req, res)=>{
    var p = userModel.all();
    p.then((row)=>{
        res.render('admin/employeeView', {
            users: row,
            layout: 'admin.main.hbs',
            layoutsDir: 'views/_layouts'
            
        });
    }).catch(err => {
        console.log(err);
    });
    
})

router.get('/editemployee/:id',(req, res, next)=>{
    var id = req.params.id;
    var p = userModel.userByID(id);
    var p2 = cate.all();
    var p3 = userModel.allRole();
    Promise.all([p,p2, p3]).then(([row, row2, row3])=>{  
        res.render('admin/editEmployeeView', {
            detail: row,
            category: row2,
            role: row3,
        
            layout: 'admin.main.hbs',
            layoutsDir: 'views/_layouts'
        });
    }).catch(err => {
        console.log(err);
    });
    
})

router.post('/editemployee/:id',(req, res, next)=>{
    var id = req.params.id;
    var p = userModel.userByID(id);
    var p2 = cate.all();
    var p3 = userModel.allRole();
    console.log(req.body.select);

    var u = {
        ID: id,
        CatID: req.body.select,
        Role: req.body.selectPos
    }
    console.log(u);
    userModel.updateUser(u);
    var p4 = userModel.all();
    p4.then((row)=>{
        res.render('admin/employeeView', {
            users: row,
      
            layout: 'admin.main.hbs',
            layoutsDir: 'views/_layouts'
        });
    }).catch(err => {
        console.log(err);
    });
})

router.get('/deleteemployee/:id', (req, res, next)=>{
    var id = req.params.id;
    userModel.deleteUser(id);
    var p = userModel.all();
    //Lọc bài chưa duyệt
    //var p = news.newsByStatus(2);
    p.then((row)=>{

        res.render('admin/employeeView', {
            users: row,
        
            layout: 'admin.main.hbs',
            layoutsDir: 'views/_layouts'
        })
    }).catch(err => {
        console.log(err);
    });
});


router.get('/reader',(req, res)=>{
    var p = userModel.allSub();
    p.then((row)=>{
        res.render('admin/readerView', {
            users: row,
       
            layout: 'admin.main.hbs',
            layoutsDir: 'views/_layouts'
        });
    }).catch(err => {
        console.log(err);
    });
})

router.get('/editsub/:id',(req, res, next)=>{
    var id = req.params.id;
    var p = userModel.subByID(id);
    p.then((row)=>{  
        res.render('admin/editReaderView', {
            detail: row,
        
            layout: 'admin.main.hbs',
            layoutsDir: 'views/_layouts'
        });
    }).catch(err => {
        console.log(err);
    });
    
})

router.post('/editsub/:id',(req, res, next)=>{
    var id = req.params.id;
    var p = userModel.subByID(id);
    var u = {
        ID: id,
        Remain: parseInt(req.body.radio) + parseInt(req.body.trick)
    };
    userModel.updateUser(u);
    var p4 = userModel.allSub();
    console.log(u);
    Promise.all([userModel.updateUser(u),p4]).then(([row1,row])=>{
        res.render('admin/readerView', {

            users: row,

            layout: 'admin.main.hbs',
            layoutsDir: 'views/_layouts'
        });
    }).catch(err => {
        console.log(err);
    });
    
    // p4.then((row)=>{
       
        
    //     res.render('admin/readerView', {

    //         users: row,
       
    //         layout: 'admin.main.hbs',
    //         layoutsDir: 'views/_layouts'
    //     });
    // }).catch(err => {
    //     console.log(err);
    // });
})

module.exports = router; 