var mysql = require('mysql');
var express = require('express');
var exphbs = require('express-handlebars');
var morgan = require('morgan');
var newsModel = require("./models/news.model");
var categoryModel = require("./models/category.model");

var bodyParser = require('body-parser');
var app = express();
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());

app.engine('hbs',exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir :'views/_layouts',
    
}));
app.set('view engine','hbs');
app.use(express.static('public'));

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

    Promise.all([p,p1,p2,p3,p4,p5,p6]).then(([rows,row1s,row2s,row3s,row4s,row5s,row6s])=>{
        res.render("home", {

            news: rows,
            news1: row1s,
            group: row3s, //select * group
            category: row2s, //model có hàm catByGroupID(id)
        
            
            })
        }).catch(err => {
        console.log(err);
    });
});


/*app.get('/image-post', (req, res) => {
    res.render('image-post');
})*/
app.get('/contact', (req, res) => {
    res.render('contact');
})
app.get('/about', (req, res) => {
    res.render('about');
})

app.use('/admin/dashboard',require('./routers/admin/admin-router'));
app.use('/news', require('./routers/news.route'));

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

<<<<<<< HEAD
//app.use('/admin/dashboard',require('./routers/admin/admin-router'));
app.use('/writer', require('./routers/writer/writer.route'));
app.use('/admin', require('./routers/admin/admin.route'));
app.use('/editor', require('./routers/editor/editor.route'));
//app.use('/news', require('./routers/news.route'));

=======
>>>>>>> 91adbbd40ce2ed414cdb1585a940e05358860d23

app.listen(3000,()=>{
    console.log('web Server is running at http://localhost:3000');
})