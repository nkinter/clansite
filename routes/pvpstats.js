var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var async = require('async');

var con = mysql.createConnection({
    host: "destiny2data.cycqbegtfmzx.us-east-1.rds.amazonaws.com",
    user: "nkinter",
    password: "fIre2167",
    database: "raw"
});


/* GET users listing. */
router.get('/', function(req, res, next) {
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM allpvphistoricalstats", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.render('pvpstats', { title: 'PVP Stats', rows: result });
        });
    });
});


module.exports = router;
