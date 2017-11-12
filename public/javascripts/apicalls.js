var request = require('request');

module.exports = {
    returnMembershipInfoByMemberID: function (input, callback) {
        var requestURI = 'https://www.bungie.net/platform/User/GetMembershipsById/' + input + '/0/';
        var options = {
            url: requestURI,
            headers: {
                'X-API-KEY': 'edfcee5054594d0387a0594ad1c73c58'
            }
        };
        // Start the request
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(body);
            }
            else
                console.log(error);
        })
    }
};


