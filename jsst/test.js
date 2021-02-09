var express = require('express');
var app = express();
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

app.use(express.static(__dirname )); 

app.get('/', function(req, res){
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