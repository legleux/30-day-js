document.body.addEventListener('mousemove', changebackgroundColor);

function changebackgroundColor(evt){
    let x = evt.clientX;
    let y = evt.clientY;
    maxX = window.innerWidth;
    maxY = window.innerHeight;
    let colors = [];
    for(let i =0;i<3;i++){
        let r = Math.floor(Math.random() * 255)
        let color = Math.floor(((x/maxX)*r))
        console.log("generated: " + color)
        colors.push(("0" + color.toString(16)).slice(-2))
    }
    // colors.forEach(color => console.log("color " + (Number(color).toString(10))))
    if( colors.some( color => Number(Number(color).toString(10)) > 190))
{        console.log("got hit")
        document.body.style.backgroundImage = "linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)"}
    else
        document.body.style.backgroundColor = `#${colors[0]}${colors[1]}${colors[2]}`
}

// function debounce(func, wait = 50, immediate = true) {
//     var timeout;
//     return function() {
//       var context = this, args = arguments;
//       var later = function() {
//         timeout = null;
//         if (!immediate) func.apply(context, args);
//       };
//       var callNow = immediate && !timeout;
//       clearTimeout(timeout);
//       timeout = setTimeout(later, wait);
//       if (callNow) func.apply(context, args);
//     };
//   };