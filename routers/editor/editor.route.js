var express = require('express');
var router = express.Router();

router.get('/',(req, res)=>{
    res.render('editor/confirmPostingView');
})
router.get('/confirm',(req, res)=>{
    res.render('editor/confirmPostingView');
})

router.get('/detailConfirm',(req, res)=>{
    res.render('editor/detailConfirmPostingView');
})

module.exports = router; 