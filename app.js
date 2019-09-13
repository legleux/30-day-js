const fs = require('fs')
const http = require('http')
const https = require('https')
// I did this: openssl req -nodes -new -x509 -keyout server.key -out server.cert
const port = 3000
const express = require('express')
const app = express()

const IP_ADDRESS = require('./getInterface')
const PORT = 3000;

var privateKey  = fs.readFileSync('./server.key', 'utf8');
var certificate = fs.readFileSync('./server.cert', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

https.createServer({
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert')
  }, app)

app.set('view engine', 'pug')
app.use(express.static('public/javascripts'))
app.use(express.static('public/css'))
app.use(express.static('public/images/'))

let lessons = require('./lessons')
let title = "Lesson "

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', lessons: lessons, message: '30 Day Javascript Challenge!' })
})

app.get('/:lesson', (req, res) =>{
    let lesson = Number(req.params.lesson);
    let lesson_title = lessons[lesson]
    console.log(lesson_title)
    // title = `${lesson} - ${lesson_title}` // BUG: Fix the title
    res.render(`${lesson}`, { title, lesson, lesson_title })
})

httpServer.listen(PORT, IP_ADDRESS, ()=> console.log(`HTTP Listening ${IP_ADDRESS, PORT}`));
const HTTPS_PORT = PORT + 443;
httpsServer.listen(HTTPS_PORT, IP_ADDRESS, ()=> console.log(`HTTPS Listening ${IP_ADDRESS, HTTPS_PORT}`));
