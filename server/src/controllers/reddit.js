const redditUrl = 'https://reddit.com/r/'
const axios = require('axios');

const searchReddit = async (subreddit) => {
    const res = await axios.get(`${redditUrl}${subreddit}.json`);
    return res.data;
}

const randomImage = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports = { searchReddit, randomImage };