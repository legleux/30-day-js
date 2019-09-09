const fs = require('fs')
const path = require('path')
const LESSONNUMBER = process.argv[2]
const LESSONNAME   = process.argv.slice(3).join(' ')
const LESSONFILE = path.resolve(path.join(__dirname , "lessons.js"))

backupOldFile( LESSONFILE, createNewLessonsFile )

function createNewLessonsFile(){
    const lessons = require(LESSONFILE)
    const CSSFILE = path.resolve(path.join(__dirname , 'public/css',`${LESSONNUMBER}.css`))
    const JSFILE = path.resolve(path.join(__dirname , 'public/javascripts',`${LESSONNUMBER}.js`))
    const PUGFILE = path.resolve(path.join(__dirname , 'views',`${LESSONNUMBER}.pug`))

    let newFileData = ["var lessons = { "]

    for (const number in lessons) {
        const name = lessons[number]
        newFileData.push(`${number}: "${name}", `)
      }

    newFileData.push(`${LESSONNUMBER} : "${LESSONNAME}", `)
    newFileData.push("}; module.exports = lessons")

    fs.writeFile(LESSONFILE, newFileData.join(''), (err) => {
        if (err) throw err;
    });

    fs.openSync(CSSFILE, 'w')
    fs.openSync(JSFILE, 'w')
    fs.writeFile(PUGFILE, "extends layout.pug\nblock content", err => {if (err) throw err})
    openCode(CSSFILE, JSFILE, PUGFILE)
}

function backupOldFile(oldfile, done) {
    fs.copyFile(oldfile, 'lessons.js.bak', (err) => {
        if (err) throw err;
        done()
    });
}

function openCode(CSSFILE, JSFILE, PUGFILE){
    const execSync = require('child_process').execSync;
    const output = execSync(`code -r ${PUGFILE} ${JSFILE} ${CSSFILE}`, { encoding: 'utf-8' });  // the default is 'buffer'
}