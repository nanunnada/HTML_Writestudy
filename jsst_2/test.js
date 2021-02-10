var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'jspdb'

});
var pool  = mysql.createPool({
    connectionLimit : 10,
    host:'localhost',
    user:'root',
    password:'',
    database: 'jspdb'
  });

app.use('/', express.static(path.join(__dirname))); //내부 파일 디렉토리에있으면 폴더이름 추가 

app.get('/', function(req, res){
    //res.sendfile(path.join('inputoutputtest.html'));
    res.sendfile('inputoutputtest.html');
    //res.render('inputoutputtest.html');
});

app.listen('12000', () => {
    console.log("clear~");
});

connection.connect();
connection.query('SELECT * FROM nametable', function(error, results, fields){
    if(error){
        console.log(error);
    }
    console.log(results);
});

app.get('/db', function(req,res){
    pool.getConnection(function(error, connection) {
        if (error) throw error;
        // Use the connection
        connection.query('SELECT * FROM nametable', function (error, results, fields) {
            res.send(JSON.stringify(results));
            console.log('result', results);
          // When done with the connection, release it.
          connection.release();
       
          // Handle error after the release.
          if (error) throw error;
       
          // Don't use the connection here, it has been returned to the pool.
        });
      });
});


connection.end();


const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try{
        const data = await fs.readFile('./server2.html');
        res.writeHead(200,{'content-Type': 'text/html; charset=urf-8'});
        res.end(data);
    }catch(err){
        console.error(err);
        res.writeHead(500, {'content-Type': 'text/plain; charset=urf-8'});
        res.end(err.message);    
    }
    }
).listen(8081, () =>{
    console.log('8081 포트에서 서버 대기중');
});