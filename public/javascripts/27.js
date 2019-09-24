const slider = document.querySelector('.items');
let isDown = false;
let startX ;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.classList.add('active');
});
slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
})
slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
})
slider.addEventListener('mousemove', (e)=> {
    if(!isDown) return
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
})
