const triggers = document.querySelectorAll('a');
const hightlight = document.createElement('span');
hightlight.classList.add('highlight');
document.body.append(hightlight);

function hightlightLink(){
    const linkCoords = this.getBoundingClientRect();
    console.log(linkCoords);
    hightlight.style.width = `${linkCoords.width}px`;
    hightlight.style.height = `${linkCoords.height}px`;
    const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        top: linkCoords.top + window.scrollY,
        left: linkCoords.left + window.scrollX
    }
    hightlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

triggers.forEach( a => {
    a.addEventListener('mouseenter', hightlightLink);
});