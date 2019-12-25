const OAuth = require('oauth');
const dotenv = require('dotenv').config();
 
console.log("..",process.env.APP_ID);
const header = {
    "X-Yahoo-App-Id": process.env.APP_ID
};
 

const request = new OAuth.OAuth(
    null,
    null,
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    '1.0',
    null,
    'HMAC-SHA1',
    null,
    header
);
module.exports = request;
