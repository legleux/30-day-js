code = "Michael"
window.addEventListener("keydown" , e => processSequence(e.key))
entered = []
const processSequence = (key) => {
    entered.push(key)
    entered.splice(-code.length-1, entered.length-code.length)
    if(entered.join('').includes(code)) {
        cornify_add()
    }
}
