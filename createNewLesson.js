const fs = require('fs')
const path = require('path')

// create the new lessons.js
let LESSONNUMBER = process.argv[2]
let LESSONNAME   = process.argv[3]
let LESSONFILE = path.resolve(path.join(__dirname , "lessons.js"))

if (process.argv.length != 4){
    console.log("Need a lesson name and number!")
}
else {
    backupOldFile( LESSONFILE, createNewLessonsFile )
}

function createNewLessonsFile(){
    console.log(`Creating Lesson ${LESSONNUMBER}: "${LESSONNAME}"`)
    const lessons = require(LESSONFILE)

    let newFileData = ["var lessons = { "]
    for (const number in lessons) {
        let name = lessons[number]
        newFileData.push(`${number}: "${name}", `)
      }
      newFileData.push(`${LESSONNUMBER}:"${LESSONNAME}", `)
    newFileData.push("}; module.exports = lessons")

    fs.writeFile(LESSONFILE, newFileData.join(''), (err) => {
        if (err) throw err;
    });

    // create the associated files .js, .css, .pug
    let CSSFILE = path.resolve(path.join(__dirname , 'public/css',`${LESSONNUMBER}.css`))
    let JSFILE = path.resolve(path.join(__dirname , 'public/javascripts',`${LESSONNUMBER}.js`))
    let PUGFILE = path.resolve(path.join(__dirname , 'views',`${LESSONNUMBER}.pug`))
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