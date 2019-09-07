const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

const checkButton = document.querySelector('.check-button')
const clearButton = document.querySelector('.clear-button')
const clearListButton = document.querySelector('.clear-list')

const checkAll = (e) => setAll(true)
const clearAll = (e) => setAll(false)

addItems.addEventListener('submit', addItem)
itemsList.addEventListener('click', toggleDone)
checkButton.addEventListener('click', checkAll)
clearButton.addEventListener('click', clearAll)
clearListButton.addEventListener('click', clearList)

populateList( items, itemsList )

function populateList(plates = [], platesList ){
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
                <label for="item${i}">${plate.text}</label>
            </li>
        `
    }).join('');
}

function setAll(value){
    items.forEach( item => item.done = value )
    localStorage.setItem('items', JSON.stringify(items))
    populateList(items, itemsList)
}

function toggleDone(e){
    if(!(e.target.matches('input'))) return
    const el = e.target;
    const index = el.dataset.index
    items[index].done = !items[index].done
    localStorage.setItem('items', JSON.stringify(items))
    populateList(items, itemsList)
}

function addItem(e) {
    e.preventDefault()
    const text = (this.querySelector('[name=item]')).value
    const item = {
        text,
        done: false
    }
    this.reset()
    items.push(item)
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items))
}
function clearList(){
    let ul = document.querySelector('ul')
    let lis = document.querySelectorAll('li')
    lis.forEach( li => ul.removeChild(li))
    localStorage.setItem('items', JSON.stringify([]))
    let length = items.length
    for(let i = 0; i<=length; i++) {
        items.pop()
    }
}
