var mysql = require("mysql");
var express = require("express");
var exphbs = require("express-handlebars");
var morgan = require("morgan");

var router = express.Router();


//router.use(express.static(__dirname + '/views/_layouts'));

router.get('/',(req,res)=>{
    
    res.render('admin/dashboard/index', { layout: false });
    
})

module.exports = router;