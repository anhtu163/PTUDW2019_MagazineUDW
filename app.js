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
    var p1 = newsModel.three_of_all();
    var p2 = categoryModel.all();
    
    p.then(rows => {
        p1.then(row1s => {
            p2.then(row2s =>{
            res.render("home", {
                
                news: rows,
                news1: row1s,
                category: row2s
             });
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
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