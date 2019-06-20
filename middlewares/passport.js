var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var subscriberModel = require('../models/subscriber.model');

module.exports = function (app) {

    app.use(passport.initialize());
    app.use(passport.session());

    var ls = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pass'
    }, (email, pass, done) => {
        subscriberModel.singleByEmail(email).then(rows => {
            if (rows.length === 0) {
                return done(null, false, {
                    message: 'Invalid email'
                });
            }

            var user = rows[0];
            //console.log(user.Pass);
            //console.log(bcrypt.hash(pass));
            var ret = bcrypt.compare(pass, user.Pass);
            if (ret) {
                return done(null, user);
            }

            return done(null, false, {
                message: 'Invalid password'
            });
        }).catch(err => {
            return done(err, false);
        })
    })

    passport.use(ls);

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}
