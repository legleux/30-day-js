const keys = document.querySelectorAll('.keys');

const playSound = e => {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"`)
    if(!audio) return;
    audio.currentTime = 0; // to play from beginning as soon as hit
    audio.play()
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
    key.classList.add('playing');
}
const removeTransition = e => {
    if (e.propertyName === 'transform') e.target.classList.remove('playing')
};

window.addEventListener('keydown', playSound);
keys.forEach( key => key.addEventListener('transitionend', removeTransition));
