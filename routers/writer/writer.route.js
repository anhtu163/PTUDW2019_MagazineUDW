var express = require('express');
var cate = require('../../models/category.model');



var router = express.Router();

router.get('/',(req, res)=>{

    res.render('writer/postingView');
})

router.get('/posting',(req, res, next)=>{
    var p = cate.all();
    p.then((row)=>{

        res.render('writer/postingView', {
            category: row
        })
    }).catch(err => {
        console.log(err);
    });
    
})
router.post('/posting', (req, res, next)=>{
     var post = {
        Title: req.body.titleInput,
        CatID: req.body.select,
        SumContent: req.body.sumContent,
        //Content: req.body.content,

     }

    console.log(post);
    res.render('writer/postingView');

})

module.exports = router; 