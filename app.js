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
    // switch(lesson) {
    //     case lesssons.find:
    //         lesson_title = 'JS + CSS Clock'
    //         break;
    //     case '3':
    //         lesson_title =
    //         break;
    //     // case '4':
    //     //     lesson_title = 'Array Cardio Day'
    //     case '5':
    //         lesson_title = 'Flex Panels Image Gallery'
    //         break;
    //     case '6':
    //         lesson_title = 'Ajax Type Ahead'
    //         break;
    //     // case '7':
    //     //     lesson_title = "Array Cardio Day 2"
    //     //     var vars = require('./public/javascripts/7.js')
    //         // console.log(vars)
    //         // page_vars['people'] = vars.people
    //         // break;
    //     case '8':
    //         lessonTitle = "";
    //         break
    //     case '10':
    //         lessonTitle = "Hold shift to check multiple boxes"
    //         break;
    //     case '11':
    //         lessonTitle = "HTML5 Video Player"
    //         break;
    //     case '12':
    //         lessonTitle = "Key Code"
    //         break;
    //     case '13':
    //         lessonTitle = "Slide in on Scroll"
    //         break;
    //     case '14':
    //         lessonTitle = "Objects and Arrays"
    //         break;
    //     default:
    //         let message = '30 Day Javascript Challenge!'
    //         res.render('index', { title: message, lessons: lessons, message: message })
    // }
    title = `Lesson ${lesson} - ${lesson_title}`
    console.log(page_vars['people'])
    res.render(`${lesson}`, { title, lesson, lesson_title, varis: page_vars })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
