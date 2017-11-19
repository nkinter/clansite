var express = require('express');
var mysql = require('mysql');
var crypto = require('crypto');
var router = express.Router();

var con = mysql.createConnection({
    // Reach out to Neill for instructions on setting environment variables
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

router.post('/auth', function(req, res, next) {
    if(!req.body.email || !req.body.password){
        res.render('login', {message: "Please enter both email and password"});
    } else {
            // Blocking Query - wait to get back credentials
            con.query("select bnet_username, bnet_membership_id, first_name, last_name, password, salt from raw.users where email = '" +
                req.body.email + "';", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                var returnedPassword = result[0].password;
                var returnedSalt = result[0].salt;
                console.log(returnedPassword);
                console.log(returnedSalt);
                console.log(req.body.password);

                var hash = crypto.createHmac('sha512', returnedSalt);
                hash.update(req.body.password);
                if (hash.digest('hex')===returnedPassword){
                    console.log('Success')
                    var currentUser = {id: req.body.email, bnet_id: result[0].bnet_membership_id};
                    req.session.user = currentUser;
                    res.render('index', {message: "You have a session"});
                } else {
                    res.render('login', {message: "Invalid credentials!"});
                }
            });
    }
});

module.exports = router;
