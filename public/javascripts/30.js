const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

let lastHole;

function randomTime(min, max){
    return Math.random() * (max - min) + min;
}

function randomHole(holes){
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];

    if(hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}
function peep(){
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up')
    setTimeout(()=> {
        hole.classList.remove('up')
        if(!timeUp) peep();
    },time)
}

function startGame(){
    scoreBoard.textContent = '0';
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000);
}

function bonk(e){
    if(!e.isTrusted) return;
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach( mole => {
    mole.addEventListener('click', bonk);
})

// TODO: Show the time remaining
// BUG You can whack-a-mole multiple times
/* NOTE Learned
isTrusted prevents fake js events
Slide image in
Maybe quickest way to create functionality similar to py range()?
[...Array(5).keys()]
or just use https://lodash.com/
*/