const fs = require('fs')
const http = require('http')
const https = require('https')
/*
    TODO: note this on these lessons with asterisk or something: I did this:
    openssl req -nodes -new -x509 -keyout server.key -out server.cert
*/
const express = require('express')
const app = express()
const IP_ADDRESS = '0.0.0.0';
const PORT = 3000;

var privateKey  = fs.readFileSync('./server.key', 'utf8');
var certificate = fs.readFileSync('./server.cert', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app)

app.set('view engine', 'pug')
app.use(express.static('public/javascripts'))
app.use(express.static('public/css'))
app.use(express.static('public/images/'))
app.use(express.static('public/sounds'))

const lessons = require('./lessons.json');
let title = "Lesson ";
const lessonRequiresHTTPS = [19, 20, 21]

app.get('/', (req, res) => {
    title = "30 Days of JS!"
    res.render('index', { title: title, lessons: lessons, message: 'Succeeded the 30 Day Javascript Challenge!' });
    if(httpsServer.address()){
        httpsServer.close()
    }
})

app.get('/:lesson', (req, res) => {
    let lesson = Number(req.params.lesson);
    let lesson_title = lessons.find( l => l.number === lesson).description;
    title = `${lesson_title}`

    if (lessonRequiresHTTPS.includes(lesson) && req.protocol == 'http') {
        const HTTPS_PORT = PORT + 443;
        httpsServer.listen(HTTPS_PORT, IP_ADDRESS);
        let hostname = req.headers.host.split(':')[0] // TODO: heavy handed to change the port
        res.redirect('https://' + hostname + ':3443' + req.url)
    } else {
        res.render(`${lesson}`, { title: lesson_title, lesson, lesson_title })
    }
})

httpServer.listen(PORT, IP_ADDRESS, ()=> console.log(`HTTP Listening ${IP_ADDRESS}:${PORT}`));
// BUG: Broke createLesson.js with lesson refactor (doesn't really mater since I'm done)
// BUG: Home link missing on https pages
// TODO: puppetter install chromium. Did I really need that for the lesson 4 or 7? remove it if not
/* TODO: would be nice if it opened the index like react-scripts-start does
   via openBrowser.js but it also uses openChrome.applescript and a bunch of logic */
// TODO: index tooltip for things learned on lesson


/* Learned
layout.pug/index
    There is no way to "uncascade" css. the homelink _will_ inherit css per lesson
    absolute positioning
    exploding objects into attributes with "&attributes" for index link on each page
"yarn why" thought I deleted lodash, then it showed up again. still have to make sure I need cheerio
    yarn why lodash
    yarn why v1.17.3
    [1/4] 🤔  Why do we have the module "lodash"...?
    [2/4] 🚚  Initialising dependency graph...
    [3/4] 🔍  Finding dependency...
    [4/4] 🚡  Calculating file sizes...
    => Found "lodash@4.17.15"
    info Reasons this module exists
    - "cheerio" depends on it
    - Hoisted from "cheerio#lodash"
    - Hoisted from "request-promise#request-promise-core#lodash"
    - Hoisted from "pug#pug-filters#constantinople#babel-types#lodash"
    info Disk size without dependencies: "4.86MB"
    info Disk size with unique dependencies: "4.86MB"
    info Disk size with transitive dependencies: "4.86MB"
    info Number of shared dependencies: 0
    ✨  Done in 0.76s.
*/