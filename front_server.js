var express = require('express');
var app = express();
app.use(express.static('front'));


app.get('/', function(req, res){
  //load html page and let angular do all the wiring
  res.sendfile('./front/index.html');
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
