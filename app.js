// https://courses.wesbos.com/account/access/5cf5c3dc85f96c03c1e47c41/view/194130581

const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.use(express.static('public/javascripts'))
app.use(express.static('public/css'))
app.use(express.static('public/images/'))

// app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

var lessons = {
    2:'JS + CSS Clock',
    3: 'Update CSS Variables with JS!',
    4: 'Array Cardio',
    5: 'Flex Panels Image Gallery',
    6: 'Ajax Type Ahead',
    7: "Array Cardio Day 2",
    8: "",
    10: "Hold shift to check multiple boxes",
    11: "HTML5 Video Player",
    12: "Key Code",
    13: "Slide in on Scroll",
    14: "Objects and Arrays",
    15: "LocalStorage and Event Delegation",
    }
let title = "Lesson "
let lesson_title = ''

app.get('/', (req, res) => {
    lessons = Object.keys(lessons)
    res.render('index', { title: 'Hey', lessons: lessons, message: '30 Day Javascript Challenge!' })
})

app.get('/:lesson', (req, res) =>{
    lesson = Number(req.params.lesson);
    vars = [];
    page_vars = [];
    lesson_title = lessons[lesson]
    title = `Lesson ${lesson} - ${lesson_title}`
    console.log(page_vars['people'])
    res.render(`${lesson}`, { title, lesson, lesson_title, varis: page_vars })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
