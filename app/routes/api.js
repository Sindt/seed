var express = require('express');
var router = express.Router();
const jwtConfig = require("../config/jwtConfig").jwtConfig;
var jwt = require("jwt-simple");

var mongoose = require('mongoose');
var User = mongoose.model('User');
var user = new User;

router.get("/", function (req, res, next) {
    user.getAll(function (err, data) {
        if (err) {
            res.json({err: "Error"})
        } else {
            res.json(data);
        }
    })
});

router.get("/user/:id", function (req, res, next) {
    user.getUserById(req.params.id, function (err, data) {
        if (err) {
            res.json({err: "Error"})
        } else {
            res.json(data);
        }
    })
});

router.post("/user", function (req, res, next) {
    console.log(req.body)
    user.addUser(req.body, function (err, data) {
        if (err) {
            res.json({err: "Error"})
        } else {
            console.log(data)
            res.json({status: "success", newUser: req.body});
        }
    });
});

router.post('/authenticate', function (req, res) {
    User.findOne({
        userName: req.body.userName
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).send({msg: 'Authentication failed. User not found.'});
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var iat = new Date().getTime() / 1000; //convert to seconds
                    var exp = iat + jwtConfig.tokenExpirationTime;
                    var payload = {
                        aud: jwtConfig.audience,
                        iss: jwtConfig.issuer,
                        iat: iat,
                        exp: exp,
                        sub: user.userName
                    }
                    var token = jwt.encode(payload, jwtConfig.secret);
                    // return the information including token as JSON
                    res.json({token: 'JWT ' + token});
                } else {
                    res.status(401).send({msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});


module.exports = router;

