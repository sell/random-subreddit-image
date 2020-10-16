require('dotenv').config();

const http = require('http');
const url = require('url');
const { searchReddit, randomImage } = require("./controllers/reddit");

const server = http.createServer((req, res) => {

    const get = () => req.method === 'GET';

    const searchedQuery = url.parse(req.url, true).query;

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Max-Age": 2592000, // 30 days
        /** add other headers as per requirement */
        'Content-Type': 'application/json'
    };

    res.writeHead(200, headers);

    if (req.url === '/api/reddit' && get()) {

        res.end(JSON.stringify({
            err: 'missing subreddit query'
        }));

    } else if (searchedQuery.subreddit && searchedQuery.imageonly === 'true' && get()) {

        searchReddit(searchedQuery.subreddit)
            .then(data => res.end(JSON.stringify({image: randomImage(data.data.children).data.url })))

    } else if (searchedQuery.subreddit && get()) {

        searchReddit(searchedQuery.subreddit)
            .then(data => res.end(JSON.stringify({ data: randomImage(data.data.children) })))
            .catch(e => {
                console.log(e);
                res.end(JSON.stringify({ err: 'Subreddit Not Found', status: 404 }))
            });

    } else {
        res.end(JSON.stringify({msg: 'Route Not Found'}))
    }
});

server.listen(process.env.PORT, () => `Started at http://localhost:${process.env.PORT}`)