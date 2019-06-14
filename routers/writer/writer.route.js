var express = require('express');
var router = express.Router();

router.get('/',(req, res)=>{

    res.render('writer/postingView');
})
router.get('/posting',(req, res)=>{

    res.render('writer/postingView');
})
router.get('/postlist',(req, res)=>{

    res.render('writer/postListView');
})
router.get('/editpost',(req, res)=>{

    res.render('writer/editPostingView');
})


module.exports = router; 