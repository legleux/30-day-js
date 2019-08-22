// https://courses.wesbos.com/account/access/5cf5c3dc85f96c03c1e47c41/view/194130581

const express = require('express')
const app = express()
const port = 3000

something = {
    id: 1,
    name: 'boobert',
    occ: 'peaknuckle'
}

app.set('view engine', 'pug')
app.use(express.static('public/javascripts'))
app.use(express.static('public/css'))


var lessons = [2]
let title = "Lesson "
// pass the list of lessons in to dynamically render list of lessons done
app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', lessons: lessons, message: '30 Day Javascript Challenge!' })
})


let lesson = '2'
app.get('/' + `${lesson}`, (req, res) =>{
    title = `Lesson ${lesson} - JS + CSS Clock`
    res.render(`${lesson}`, {something, title})
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
