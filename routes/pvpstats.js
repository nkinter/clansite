var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    // Reach out to Neill for instructions on setting environment variables
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME
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
