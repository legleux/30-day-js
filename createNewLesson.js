const fs = require('fs');
const path = require('path')
const LESSON_FILE = './lessons.json'
const lessons = require(LESSON_FILE)
const LESSON_NUMBER = process.argv[2]
const LESSON_NAME   = process.argv.slice(3).join(' ')
const NEW_LESSON = {number: Number(LESSON_NUMBER), description: LESSON_NAME}
const CSSFILE = path.resolve(path.join(__dirname , 'public/css',`${LESSON_NUMBER}.css`))
const JSFILE = path.resolve(path.join(__dirname , 'public/javascripts',`${LESSON_NUMBER}.js`))
const PUGFILE = path.resolve(path.join(__dirname , 'views',`${LESSON_NUMBER}.pug`))

function writeNewLessonFile(newLesson) {
    lessons.push(newLesson);
    fs.writeFileSync('lessons.json', JSON.stringify(lessons, null, 2));
}

function createFiles(){
    fs.openSync(CSSFILE, 'w')
    fs.openSync(JSFILE, 'w')
    fs.writeFile(PUGFILE, "extends layout.pug\nblock content", err => {if (err) throw err})
}

function openCode(CSSFILE, JSFILE, PUGFILE){
    const execSync = require('child_process').execSync;
    execSync(`code -r ${PUGFILE} ${JSFILE} ${CSSFILE}`, { encoding: 'utf-8' });  // the default is 'buffer'
    // BUG: hope you use vscode
}
function backupOldFile(filePath) {
    fs.copyFile(filePath, `${LESSON_FILE}.bak`, (err) => {
        if (err) throw err;
    });
}

backupOldFile(LESSON_FILE)
writeNewLessonFile(NEW_LESSON);
createFiles();
openCode(CSSFILE, JSFILE, PUGFILE);
