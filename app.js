var mysql = require('mysql');
var express = require('express');
var exphbs = require('express-handlebars');
var hbs_sections= require('express-handlebars-sections');
//var morgan = require('morgan');
var newsModel = require("./models/news.model");
var categoryModel = require("./models/category.model");
var createError = require('http-errors');
var roleModel = require("./models/role.model");

//var quill = new Quill();
var app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static('public'));
app.engine('hbs',exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir :'views/_layouts',
    helpers:{
        section: hbs_sections()
    }
}));
app.set('view engine','hbs');
require('./middlewares/session')(app);
require('./middlewares/passport')(app);
app.use(require('./middlewares/auth-locals.mdw'));




//app.use(require('./middlewares/locals.mdw'));
/*app.get('/',(req,res)=>{
    res.render('home');
})*/

app.get('/', (req, res) => {
    //res.render('home');

    var p = newsModel.all();
    var p1 = newsModel.lastest_news();
    var p2 = categoryModel.all();
    var p3 = newsModel.top_news_1();
    var p4 = newsModel.top_news_2();
    var p5 = newsModel.newsByBestViewNum();
    var p6 = newsModel.newsOrderByViewNum();
    var p7 = newsModel.topNewsByCat();
    if(req.user)
    {
        var p8 = roleModel.RoleByUser(req.user.Role);
         Promise.all([p, p1, p2, p3, p4, p5, p6, p7, p8]).then(([rows, row1s, row2s, row3s, row4s, row5s, row6s, row7s, row8s]) => {
             res.render("home", {

                 news: rows,
                 news1: row1s,
                 category: row2s,
                 top1: row3s,
                 top2: row4s,
                 bestView: row5s,
                 view: row6s,
                 top10: row7s,
                 role: row8s[0].RoleName

             });
         }).catch(err => {
             console.log(err);
         });
    }
    else{
        Promise.all([p, p1, p2, p3, p4, p5, p6, p7]).then(([rows, row1s, row2s, row3s, row4s, row5s, row6s, row7s]) => {
            res.render("home", {

                news: rows,
                news1: row1s,
                category: row2s,
                top1: row3s,
                top2: row4s,
                bestView: row5s,
                view: row6s,
                top10: row7s,
                

            });
        }).catch(err => {
            console.log(err);
        });
    }
    

   
    
    
})
app.post('/',(req,res)=>{
    var str =  req.body.search;
    console.log(newsModel.search(str));
    newsModel.search(str).then(rows=>{
        res.render('search-results',{
            result : rows
        })
    })
})


/*app.get('/image-post', (req, res) => {
    res.render('image-post');
})*/
app.get('/contact', (req, res) => {
    res.render('contact');
})
app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/subscriber', (req, res) => {
    res.redirect('/');
})


app.use('/writer', require('./routers/writer/writer.route'));
app.use('/admin', require('./routers/admin/admin.route'));
app.use('/editor', require('./routers/editor/editor.route'));
app.use('/news', require('./routers/news.route'));
app.use('/account',require('./routers/account.route'));
app.use((req, res, next) => {
    next(createError(404));
})

app.use((err, req, res, next) => {
    var status = err.status || 500;
    var errorView = 'error';
    if (status === 404)
        errorView = '404';

    var msg = err.message;
    var error = err;
    res.status(status).render(errorView, {
        layout: false,
        msg,
        error
    })
})


app.listen(3000,()=>{
    console.log('web Server is running at http://localhost:3000');
})