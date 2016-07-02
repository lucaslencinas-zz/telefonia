var api_key = 'key-5bd724f94fa38e82a0a602ff3fcdb2dd';
var domain = 'sandboxb491783fd812409687d5dccc0c043f1a.mailgun.org';

exports.mailsender = require('mailgun-js')({apiKey: api_key, domain: domain});
