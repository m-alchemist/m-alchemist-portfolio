var express=require('express');



var app=module.exports=express();

var port = process.env.PORT || 3000;

app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname +'/style'));
app.use(express.static(__dirname +'/files'));

app.listen(port,function(){
  console.log('listening on port '+port);
});
