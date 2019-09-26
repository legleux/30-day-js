let countdown;
const endtime = document.querySelector('.display__end-time');
const timerDisplay = document.querySelector('.display__time-left');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    clearInterval(countdown); // maybe use workers to actual have multiple timers
    const now = Date.now();
    const then = now + seconds *1000;
    displayTimeLeft(seconds);
    displayEndtime(then);
    countdown = setInterval(()=>{
        const secondsLeft= Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    },1000)
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? 0 : ''}${remainderSeconds} `
    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndtime(timestamp){
    const end  = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    endtime.textContent = `${hours > 12 ? hours - 12 : hours}:${minutes <10 ? '0':''}${minutes}`
}

function startTimer(){
    const seconds = parseInt(this.dataset.time)
    timer(seconds);
    // console.log(this.querySelector('[data-time'));
}

buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const minutes = this.minutes.value;
    timer(minutes * 60);
    this.reset();
})
/*  Writing a timer managing and displaying the time left
    reminded that "querySelectorAll('[<someAtrribute]')" is how to hone in on the attributes of an element
    and attributes prepended with data-<something> can be access in handlers with this.dataset.<something>
    elements that have a name can be accessed as <el>.<name> i.e. a <ul name='groceries'> can be found document.groceries
    TODO: Create a pomodoro timer
    list the timers on the side,
    flash screen when done
    button for audible timer done (different sounds for different timers?)
    local storage to maintain timers if tab closed
*/