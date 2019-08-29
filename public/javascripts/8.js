const canvas = document.querySelector("#draw");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 20;

//ctx.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(evt){
    if(!isDrawing) return;
    // console.log(evt);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(evt.offsetX, evt.offsetY);
    ctx.stroke();
    // "destructuring" an array
    [lastX, lastY] = [evt.offset, evt.offsetY]
    hue++;

    if(hue >= 360) {
        hue = 0;
    }

    if(ctx.lineWidth >= 60 || ctx.lineWidth < 20){
        console.log(ctx.lineWidth)
        console.log("reached edge");
        direction = !direction;
    }
    if(direction){
        console.log("increasing");
        ctx.lineWidth++;
    } else {
        console.log("decreasing");
        ctx.lineWidth--;
    }
}

canvas.addEventListener('mousedown', (evt)=> {
    isDrawing = true;
    [lastX, lastY] = [evt.offsetX, evt.offsetY];
});
canvas.addEventListener('mousemove', (evt) => draw(evt));
canvas.addEventListener('mouseup', ()=> isDrawing = false);
canvas.addEventListener('mouseout', ()=> isDrawing = false);