const rp = require('request-promise');
const cheerio = require('cheerio');
const URL = 'https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris';

rp(URL)
  .then((html) => {
    //success!
    $ = cheerio.load(html);

    Array
        .from($('.mw-category a')).filter(word => {
            let value = word.children[0].data;
            if(value.includes('de')){
                return value;
            }
        })
        .forEach(link => console.log(link.children[0].data));
        })
  .catch(function(err){
  });