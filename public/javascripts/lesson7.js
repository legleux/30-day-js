var vars = require('./7.js')
let people = vars.people
let comments = vars.comments

people.forEach((person) =>{
    console.log(person.name, person.year)
})
comments.forEach((comment) =>{
    console.log({comment});
})

let age = 19;
const current_year = (new Date).getFullYear();

const isAdult  = people.some( (person) => {
    return (current_year - person.year  >= age)
});

const everyIsAdult  = people.every( (person) => {
    return (current_year - person.year  >= age)
});

console.log({isAdult});
console.log({everyIsAdult});

myComment = 823423;
console.log(comments.find( (comment) => comment.id == myComment));

console.log(
    `Deleting comment: ${myComment}`
);
console.log({comments})
//delete comments[comments.findIndex( (comment) => comment.id == myComment)] // delete will leave an empty item
comments.splice(comments[comments.findIndex( (comment) => comment.id == myComment)], 1); // remove the next <1> elements at <index>
console.log({comments})