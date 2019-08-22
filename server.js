


var http = require('http');
const pug = require('pug');
var url  = require('url');
const querystring = require('querystring');

let PORT = process.argv[2];

function format_date( date ) {
    /** Receives a Date object and returns JSON hours, minutes, seconds */
    d = new Date(date);
    hours = d.getHours();
    minutes = d.getMinutes();
    seconds = d.getSeconds();
    return({hour: hours, minute: minutes, second: seconds })
}

http.createServer( (req, resp) => {
    let body = [];
    let hit_url = '';
    req.on("data", chunk => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        hit_url = url.parse(req.url, true);
        endpoint = hit_url['pathname']
        console.log(endpoint)
        query = hit_url['query']

        switch (endpoint) {
            case '/2/css_clock':
            // render however you do with express
            // Compile template.pug, and render a set of data
            console.log(pug.renderFile('index.pug', {
                name: 'Mikey'
            }));
            // "<p>Timothy's Pug source code!</p>"
            response = format_date(date);
                break;
            case '/api/unixtime':
                unix_time = new Date(query['iso']).getTime();
                response = {"unixtime": unix_time}
                break;
            default:
                response = `unhandled endpoint ${endpoint}`
        }
        resp.end(JSON.stringify(response));
    });
}).listen(PORT);