var express = require('express');
var request = require('request');
var keys = require('../ignore/keys.json')
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    let input = "Z"+req.query.text;


    var zillow_output = {all_homes:'For an average home, expect to pay $',one_bedroom:'For a one bedroom apartment, expect to pay $',two_bedroom:'For one room in a two bedroom apartment, expect to pay $',three_bedroom:'For one room in a three bedroom apartment, expect to pay $',studio:'For a studio apartment, expect to pay $',walkscore:"Walkscore: "};


    //all homes
    var options = { method: 'GET',
        url: 'https://www.quandl.com/api/v3/datasets/ZILLOW/'+input+'_MRPAH.json',
        qs: { api_key: keys.zillow_key },
        headers:
            { 'Postman-Token': '1499e613-7bed-4aca-9587-0fa998fbb23b',
                'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var info = JSON.parse(body);
        if (typeof info.dataset === 'undefined'){
            zillow_output.all_homes += "Information not available";
        }
        else{

            zillow_output.all_homes += info.dataset.data[0][1];

        }


    });

    //one bedroom
    options = { method: 'GET',
        url: 'https://www.quandl.com/api/v3/datasets/ZILLOW/'+input+'_MRP1B.json',
        qs: { api_key: keys.zillow_key },
        headers:
            { 'Postman-Token': '1499e613-7bed-4aca-9587-0fa998fbb23b',
                'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        info = JSON.parse(body);
        if (typeof info.dataset === 'undefined'){
            zillow_output.one_bedroom += "Information not available";
        }
        else{

            zillow_output.one_bedroom += info.dataset.data[0][1];

        }


    });

    //two bedroom
    options = { method: 'GET',
        url: 'https://www.quandl.com/api/v3/datasets/ZILLOW/'+input+'_MRP2B.json',
        qs: { api_key: keys.zillow_key },
        headers:
            { 'Postman-Token': '1499e613-7bed-4aca-9587-0fa998fbb23b',
                'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        info = JSON.parse(body);
        if (typeof info.dataset === 'undefined'){
            zillow_output.two_bedroom += "Information not available";
        }
        else{

            zillow_output.two_bedroom += Math.floor(info.dataset.data[0][1]/2);

        }


    });

    //three bedroom
    options = { method: 'GET',
        url: 'https://www.quandl.com/api/v3/datasets/ZILLOW/'+input+'_MRP3B.json',
        qs: { api_key: keys.zillow_key },
        headers:
            { 'Postman-Token': '1499e613-7bed-4aca-9587-0fa998fbb23b',
                'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        info = JSON.parse(body);
        if (typeof info.dataset === 'undefined'){
            zillow_output.three_bedroom += "Information not available";
        }
        else{

            zillow_output.three_bedroom += Math.floor(info.dataset.data[0][1]/3);

        }


    });

    //studio
    options = { method: 'GET',
        url: 'https://www.quandl.com/api/v3/datasets/ZILLOW/'+input+'_MRPST.json',
        qs: { api_key: keys.zillow_key },
        headers:
            { 'Postman-Token': '1499e613-7bed-4aca-9587-0fa998fbb23b',
                'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        info = JSON.parse(body);
        if (typeof info.dataset === 'undefined'){
            zillow_output.studio += "Information not available";
        }
        else{

            zillow_output.studio += info.dataset.data[0][1];

        }


    });


    //get lat and lon
    options = { method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        qs:
            { address: req.query.text,
                key: keys.google_maps_key },
        headers:
            { 'Postman-Token': 'ac621122-80c6-496b-988d-2a8b7ac8a986',
                'cache-control': 'no-cache' } };

    var lat = ""
    var lng = ""
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        info = JSON.parse(body);
        lat = info.results[0].geometry.location.lat;
        lng = info.results[0].geometry.location.lng;
        console.log(body);
    });





    setTimeout(function(){
        options = { method: 'GET',
            url: 'http://api.walkscore.com/score',
            qs:
                { format: 'json',
                    lat: lat.toString(),
                    lon: lng.toString(),
                    transit: '1',
                    bike: '1',
                    wsapikey: keys.walkscore_key },
            headers:
                { 'Postman-Token': '9921d17a-084f-4d00-945d-3d8439a56dec',
                    'cache-control': 'no-cache' } };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            info = JSON.parse(body);
            zillow_output.walkscore += info.walkscore;

            console.log(body);
        });


    }, 5000);

    setTimeout(function(){
        res.json({result:zillow_output});
    }, 7000);





});

module.exports = router;