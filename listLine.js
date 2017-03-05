var https = require("https");

var authentication = 'plencinas:entropia';

var headers = {
  'SoapAction':'CUCM:DB ver=9.1',
  'Authorization': 'Basic ' + new Buffer(authentication).toString('base64'),
  'Content-Type': 'text/xml; charset=utf-8'
}

var soapBody = new Buffer('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:axl="http://www.cisco.com/AXL/API/9.1">' +
   '<soapenv:Header/>' +
   '<soapenv:Body>' +
      '<axl:listLine>' +
        '<searchCriteria>' +
          '<pattern>58401148</pattern>' +
        '</searchCriteria>' +
        '<returnedTags>' +
          '<pattern/>' +
          '<description/>' +
          '<usage/>' +
          '<routePartitionName/>' +
        '</returnedTags>' +
    '</axl:listLine>' +
   '</soapenv:Body>' +
'</soapenv:Envelope>');

var options = {
  host: '9.8.130.171',        // The IP Address of the Communications Manager Server
  port: 443,                  // Clearly port 443 for SSL -- I think it's the default so could be removed
  path: '/axl/',              // This is the URL for accessing axl on the server
  method: 'POST',             // AXL Requires POST messages
  headers: headers,           // using the headers we specified earlier
  rejectUnauthorized: false   // required to accept self-signed certificate
};

// Doesn't seem to need this line, but it might be useful anyway for pooling?
options.agent = new https.Agent(options);

var req = https.request(options, function(res) {
  console.log("status code = ", res.statusCode);
  console.log("headers = " , res.headers);
  res.setEncoding('utf8');
  res.on('data', function(d) {
    console.log("Got Data: " + d);
  });
});

req.write(soapBody);
req.end();
req.on('error', function(e) {
  console.error(e);
});