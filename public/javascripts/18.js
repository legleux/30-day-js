const timeNodes = document.querySelectorAll('[data-time]')

let timeArray = Array.from(timeNodes)
const seconds = timeArray
    .map(node => node.dataset.time)
    .map(timeCode => {
        const [min,secs] = timeCode.split(":").map(parseFloat)
        return min*60 + secs
    })
    .reduce((totalTime,time) => totalTime + time)
const timeStamp = [Math.floor(seconds/3600), Math.floor(seconds/60)%60, seconds%60].join(":")
console.log(timeStamp)
document.querySelector('body').innerHTML += `<h3> Total time: ${timeStamp}</h1>`