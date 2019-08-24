    // Array.prototype.filter()
    // 1. Filter the list of inventors for those who were born in the 1500's

    // Array.prototype.map()
    // 2. Give us an array of the inventors' first and last names

    // Array.prototype.sort()
    // 3. Sort the inventors by birthdate, oldest to youngest

    // Array.prototype.reduce()
    // 4. How many years did all the inventors live?
    // 5. Sort the inventors by years lived
    // 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
    // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
    // 7. sort Exercise
    // Sort the people alphabetically by last name
    // 8. Reduce Exercise
const inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
    { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
    { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
    { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
    { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
    ];

const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];

// 1
function getFifteeners(inventors) {
    let fifteeners = inventors.filter( inventor => inventor.year >= 1500 && inventor.year < 1600)
    return fifteeners;
}
console.table(getFifteeners(inventors));

// 2
function names(inventors){
    const names = inventors.map( inventor => `${inventor.first} ${inventor.last}`);
    return names;
}
console.table(names(inventors));

// 3
function sortByBirthdate(inventors){
    return inventors.sort( (first, second) => {
        return first.year > second.year ? 1 : -1;
    });
}
console.table(sortByBirthdate(inventors));

// 4
function yearsLived(inventors) {
    return inventors.reduce( (acc, cur) => {return acc + (cur.passed - cur.year)},0);
}
console.table(yearsLived(inventors));

// 5 Sort by years lived
function sortedYearsLived(inventors){
    return inventors.sort((first, second) =>{
        return first.passed- first.year >  second.passed- second.year ? 1 : -1;
    });
}
console.table(sortedYearsLived(inventors));

// 6 overcomplicated cheerio version
// const rp = require('request-promise');
// const cheerio = require('cheerio');
// const URL = 'https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris';

// rp(URL)
//   .then((html) => {
//     //success!
//     $ = cheerio.load(html);

//     let des = Array
//         .from($('.mw-category a')).filter(word => {
//             let value = word.children[0].data;
//             if(value.includes('de')){
//                 return value;
//             }
//         })
//         .forEach(link => console.table(link.children[0].data));
//         })
//   .catch(function(err){
//   });


// 7
let np = people.map( person => {
    person.split(',');
    let list =person.split(',');
    return list;
})
let sorted = np.sort( (a,b) => {
    return a[0]>b[0] ? 1 : -1;
});
console.table(sorted);

// 8
// Sum up the instances of each of these

const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck', 'pogostick'];

const i = data.reduce( (acc, cur) => {
    if(acc[cur]){
        acc[cur]++;
    } else {
        acc[cur] = 1;
    }
    return acc;
}, {});

console.table(i);


/*
    Array.prototype.filter
        returns array of elements based on callback
        may trim array
    Array.prototype.map
        returns same length
        may return empty elements
    Array.prototype.reduce
        accumulator

*/