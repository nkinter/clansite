var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.user){
        console.log(req.session.user);
        res.render('protectedpage', {id: req.session.user.bnet_id})
    } else {
        var err = new Error("Not logged in!");
        console.log(req.session.user);
        res.redirect('login');
    }
});

module.exports = router;