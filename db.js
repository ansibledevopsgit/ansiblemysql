
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'mysqldb',
    port     :  3306,
    user     : 'user66',
    password : '1234',
    database : 'accounting'
});

  // connection.connect((err) => {
  //     if(err) throw err;
  //    console.log('Connected to MySQL Server!');
  // });

module.exports = connection;