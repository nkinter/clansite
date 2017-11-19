var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var crypto = require('crypto');
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

router.post('/submit', function(req, res, next) {

    if (req.body.password1!=req.body.password2) {
        res.send("Passwords not the same. Try Again");
    } else {

        var genRandomString = function(length){
            return crypto.randomBytes(Math.ceil(length/2))
                .toString('hex') /** convert to hexadecimal format */
                .slice(0,length);   /** return required number of characters */
        };

        var sha512 = function(password, salt){
            var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
            hash.update(password);
            var value = hash.digest('hex');
            return {
                salt:salt,
                passwordHash:value
            };
        };

        function saltHashPassword(userpassword) {
            var salt = genRandomString(16); /** Gives us salt of length 16 */
            var passwordData = sha512(userpassword, salt);
            console.log('UserPassword = '+userpassword);
            console.log('Passwordhash = '+passwordData.passwordHash);
            console.log('nSalt = '+passwordData.salt);
            var returnArray = [passwordData.passwordHash, passwordData.salt]
            return returnArray;
        }

        var hashedPassword = saltHashPassword(req.body.password1);

        apicalls.returnMembershipInfoByMemberID(req.body.bnet_id, function(data) {
            var membershipId = JSON.parse(data).Response.destinyMemberships[0].membershipId;
            var displayName = JSON.parse(data).Response.destinyMemberships[0].displayName;
            var status = JSON.parse(data).Message;


            if (status != "Ok") {
                res.send("Error finding member ID " + req.body.bnet_id);
            } else {
                con.connect(function (err) {
                    if (err) throw err;
                    con.query("insert into raw.users (email, bnet_username, bnet_id, bnet_membership_id, password, salt) values ('" +
                        req.body.email + "','" +
                        displayName + "','" +
                        req.body.bnet_id + "','" +
                        membershipId + "','" +
                        hashedPassword[0] + "','" +
                        hashedPassword[1] + "');", function (err, result, fields) {
                        if (err) throw err;
                        console.log(result);
                    });
                });

                res.send('Success finding ' + req.body.bnet_id + '. Added to database.');
            }
        });
    }
});


module.exports = router;