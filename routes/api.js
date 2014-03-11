var fs = require('fs'),
  _ = require('underscore');

exports.postEntry = function(req, res) {
  var entry = JSON.stringify(req.body) + '\r\n';
  fs.appendFile('logs/log.txt', entry, function(err) {
    if(err) throw new Error('Error appending text to file');
    res.send(200);
  });
}

exports.getEntries = function(req, res) {
  fs.readFile('logs/log.txt', function(err, data) {
    if (err) throw new Error('Error reading file');

    var results = [];
    //data is a buffer, and we use to toString() to convert it to a string, then we split it based on \r\n
    _.forEach(data.toString().split('\r\n'), function(datum) {
      if (datum) {
        results.push(JSON.parse(datum));
      }
    })
    res.send(results);
  })
  
}