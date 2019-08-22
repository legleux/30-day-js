// https://courses.wesbos.com/account/access/5cf5c3dc85f96c03c1e47c41/view/194130581

const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.use(express.static('public/javascripts'))
app.use(express.static('public/css'))


var lessons = [2, 3]
let title = "Lesson "
let lesson_title = ''

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', lessons: lessons, message: '30 Day Javascript Challenge!' })
})

app.get('/:lesson', (req, res) =>{
    lesson = req.params.lesson
    switch(lesson) {
        case '2':
            lesson_title = 'JS + CSS Clock'
            break;
        case '3':
            lesson_title = 'Update CSS Variables with JS!'
            break;
        default:
            let message = '30 Day Javascript Challenge!'
            res.render('index', { title: message, lessons: lessons, message: message })
    }
    title = `Lesson ${lesson} - ${lesson_title}`
    res.render(`${lesson}`, { title, lesson })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
