var express=require('express');
var path=require('path');



var app=module.exports=express();

var port = process.env.PORT || 3000;
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname +'/style'));
app.use(express.static(__dirname +'/files'));

app.get('/projects',function(req,res,next){
  res.sendFile(path.join(__dirname, './public', 'projects.html'));
})

app.listen(port,function(){
  console.log('listening on port '+port);
});
