const fs = require('fs')
const http = require('http')
const https = require('https')
// TODO: note this on these lessons with asterisk or something: I did this: openssl req -nodes -new -x509 -keyout server.key -out server.cert
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

let lessons = require('./lessons');
let title = "Lesson ";
const lessonRequiresHTTPS = [19, 20, 21]

app.get('/', (req, res) => {
    title = "30 Days of JS!"
    res.render('index', { title: title, lessons: lessons, message: '30 Day Javascript Challenge!' });
    if(httpsServer.address()){
        httpsServer.close()
    }
})

app.get('/:lesson', (req, res) => {
    let lesson = Number(req.params.lesson);
    let lesson_title = lessons[lesson];
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
// TODO: puppetter install chromium. Did I really need that for the lesson 4 or 7? remove it if not
/* TODO: would be nice if it opened the index like react-scripts-start does
   via openBrowser.js but it also uses openChrome.applescript and a bunch of logic */
// TODO: index tooltip for things learned on lesson
// TODO: link on each page to go back to index