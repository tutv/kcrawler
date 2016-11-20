'use strict';

var Crawler = require("simplecrawler");
const fs = require('fs');
var cheerio = require("cheerio");

const output = 'output.txt';
const source = 'source.txt';
fs.writeFileSync(output, '');
fs.writeFileSync(source, '');

const url = 'http://blogk.xyz';
const depth = 3;

function cleanContent(content) {
    content = content.replace(/\s+/g, ' ');

    return content;
}

var crawler = Crawler(url)
    .on("fetchcomplete", function (queueItem, responseBuffer, response) {
        var content_type = response.headers['content-type'];
        if (content_type.indexOf('text/html') == -1) {
            return;
        }

        var url = queueItem.url;

        var request = require('request');
        var _continue = this.wait();

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let $ = cheerio.load(body);

                var text = $('body').text();
                text = cleanContent(text);
                fs.appendFileSync(source, text + "\n");
            }

            _continue();
        });

        fs.appendFileSync(output, queueItem.url + "\n");

        console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
        console.log("It was a resource of type %s", response.headers['content-type']);
    });

crawler.maxDepth = depth;
crawler.interval = 1000;
crawler.respectRobotsTxt = true;

crawler.start();