'use strict';
const fs = require('fs');
const input = 'output.txt';
const output = 'sources.txt';
var request = require('request');
var sleep = require('sleep');
var cheerio = require("cheerio");

request('https://world.taobao.com/', function (error, response, body) {
    // if (!error && response.statusCode == 200) {
    //     let $ = cheerio.load(body);
    //
    //     var text = $('body').text();
        console.log(response);
    // }

});