var express = require('express');
var session = require('express-session');
var subscriberModel = require('../models/subscriber.model');
var passport = require('passport');
var router = express.Router();
var bcrypt = require('bcrypt');
var auth = require('../middlewares/auth');
//ar local = require('passport-local').Strategy;

//var quill = require('quill');

router.get('/login', (req, res, next) => {
    
    res.render('account/login');
});
router.post('/login', (req, res, next) => {

      passport.authenticate('local', (err, user, info) => {
          if (err)
              return next(err);

          if (!user) {
              //console.log(info.message)
             // err_message: info.message
              return res.render('account/login', {
                  
                  err_message: info.message
              })
          }

          req.logIn(user, err => {
              if (err)
                  return next(err);

              return res.redirect('/');
          });
      })(req, res, next);
    
    
});


router.get('/is-available', (req, res, next) => {
    var email = req.query.email;
    subscriberModel.singleByEmail(email).then(rows => {
        if (rows.length > 0)
            return res.json(false);

        return res.json(true);
    });
})

router.get('/profile',auth, (req, res, next) => {

    var curr = req.user;
   // console.log(curr);
    var dob = Math.round(req.user.Birthday);
    
    res.render('account/profile',{
        currentUser : req.user,
        Dob : dob, 
    })
});

router.post('/profile', auth, (req, res, next) => {

    var entity ={
        ID: req.user.ID,
        Name : req.body.name,
        Birthday : req.body.dob,
        NickName : req.body.nickname
    }
    
    subscriberModel.update(entity);
    //req.logOut();
   //req.login(entity.Email,entity.Pass);
  // req.user.update();
    res.redirect("/account/profile");
});

router.get('/signout', (req, res, next) => {

     req.logout();
     res.redirect('/');
});

router.get('/register', (req, res, next) => {

    res.render('account/register');
});
router.post('/register',  (req, res, next) => {


        const round = 10;
        //console.lo(bcrypt.hashSync(pass, 10));
       var entity = {
           Email: req.body.email,
           Pass: bcrypt.hashSync(req.body.pass,round),
           Remain: 0
       }
       subscriberModel.add(entity).then(id =>{
            console.log("Đăng kí thành công");
           res.redirect('/account/login');
          
       })

  
    

});

module.exports = router;