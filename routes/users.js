var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var apicalls = require('../public/javascripts/apicalls');


var con = mysql.createConnection({
    // Reach out to Neill for instructions on setting environment variables
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Register' });
});

router.post('/register', function(req, res, next) {
    //https://www.bungie.net/platform/User/GetMembershipsById/16942309/0/
    res.json(apicalls.returnMembershipInfoByMemberID(req.body.bnet_id));
    //con.connect(function(err) {
    //    if (err) throw err;
    //    con.query("insert into raw.members values ('" + req.body.membershipid + "','" + req.body.username + "','" + req.body.firstname + "','" +  req.body.lastname + "');", function (err, result, fields) {
    //        if (err) throw err;
    //        console.log(result);
    //        res.send('Success ');
    //    });
    //});
});

module.exports = router;
