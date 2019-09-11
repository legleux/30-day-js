// https://courses.wesbos.com/account/access/5cf5c3dc85f96c03c1e47c41/view/194130581

const express = require('express')
const app = express()
const port = 3000

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
