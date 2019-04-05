var express = require('express');
var request = require('request');
var keys = require('../ignore/keys.json')
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    let input = req.query.text;

    var testurl = 'https://www.quandl.com/api/v3/datasets/ZILLOW/Z'+input+'_MRPAH.json';

    var options = { method: 'GET',
        url: testurl,
        qs: { api_key: keys.zillow_key },
        headers:
            { 'Postman-Token': '1499e613-7bed-4aca-9587-0fa998fbb23b',
                'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var info = JSON.parse(body);
        if (typeof info.dataset === 'undefined'){
            res.json({result:"Information not available for this zipcode"});
        }
        else{

            res.json({result:info.dataset.data[0][1]});
        }

    });





});

module.exports = router;
