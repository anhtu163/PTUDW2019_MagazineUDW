var mysql = require('mysql');
var express = require('express');
var exphbs = require('express-handlebars');
var morgan = require('morgan');
var newsModel = require("./models/news.model");
var categoryModel = require("./models/category.model");

var app = express();

app.engine('hbs',exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir :'views/_layouts'
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

    Promise.all([p,p1,p2,p3,p4]).then(([rows,row1s,row2s,row3s,row4s])=>{
        res.render("home", {

            news: rows,
            news1: row1s,
            category: row2s,
            top1: row3s,
            top2: row4s
        });
    }).catch(err => {
        console.log(err);
    });
    
    
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

app.use('/admin/dashboard',require('./routers/admin/admin-router'));
app.use('/news', require('./routers/news.route'));

app.listen(3000,()=>{
    console.log('web Server is running at http://localhost:3000');
})