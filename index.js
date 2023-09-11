#!/usr/bin/node
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path'); // Require the 'path' module for file path manipulation.

const server = http.createServer(function(req, res) {
    let pathname = url.parse(req.url).pathname;

    // Map URL paths to their corresponding HTML files.
    let pageMappings = {
        '/index.html': 'index.html',
        '/about.html': 'about.html',
        '/contact-me.html': 'contact-me.html',
    };

    // Check if the requested pathname exists in the pageMappings.
    if (pageMappings.hasOwnProperty(pathname)) {
        // Construct the file path based on the requested pathname.
        let filePath = path.join(__dirname, pageMappings[pathname]);

        // Read the content of the corresponding HTML file and send it as the response.
        fs.readFile(filePath, function(err, data) {
            if (err) {
                // Handle error (e.g., file not found) by serving a 404 page.
                fs.readFile(path.join(__dirname, '404.html'), function(err, errorPageData) {// For some reason isnt redirecting to 404.html
                    if (err) {
                        // If the 404.html page is also not found, send a simple text response.
                        res.writeHead(404, {'Content-Type': 'text/plain'});
                        res.end('File not found');
                    } else {
                        // Send the 404 page as the response.
                        res.writeHead(404, {'Content-Type': 'text/html'});
                        res.end(errorPageData);
                    }
                });
            } else {
                // Send the file content as the response.
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    } else {
        // If the requested pathname doesn't match any known pages, return a 404 response.
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
}).listen(8080);

console.log('Server is running at http://localhost:8080/index.html');
