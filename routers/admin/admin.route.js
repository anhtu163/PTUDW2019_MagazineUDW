var express = require('express');
var router = express.Router();

router.get('/',(req, res)=>{
    res.render('admin/confirmPostingView');
})

router.get('/confirm',(req, res)=>{
    res.render('admin/confirmPostingView');
})

router.get('/employee',(req, res)=>{
    res.render('admin/employeeView');
})

router.get('/reader',(req, res)=>{
    res.render('admin/readerView');
})

router.get('/editEmployee',(req, res)=>{
    res.render('admin/editEmployeeView');
})

router.get('/editReader',(req, res)=>{
    res.render('admin/editReaderView');
})

module.exports = router; 