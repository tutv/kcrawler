'use strict';
const fs = require('fs');
const input = 'output.txt';
const output = 'sources.txt';
var request = require('request');
var sleep = require('sleep');
var cheerio = require("cheerio");

var lineByLine = require('n-readlines');
var liner = new lineByLine(input);

var line;
var lineNumber = 0;
while (line = liner.next()) {
    var l = line.toString();
    console.log(`Start fetching ${l}`);

    request(l, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(body);

            var text = $.text();
            console.log(text);
        }
    });

    sleep.sleep(1);

    lineNumber++;
}