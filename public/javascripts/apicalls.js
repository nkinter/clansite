var request = require('request');

module.exports = {
    returnMembershipInfoByMemberID: function (input) {
        var requestURI = 'https://www.bungie.net/platform/User/GetMembershipsById/' + input + '/0/';
        var options = {
            url: requestURI,
            headers: {
                'X-API-KEY': 'edfcee5054594d0387a0594ad1c73c58'
            }
        };
        var membershipId = 'unknown'
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                return JSON.parse(body);
                //membershipId = info.Response.destinyMemberships.membershipId;
                console.log(info.Response.destinyMemberships.membershipId);
            }
        }
        request(options, callback);

    }
};


