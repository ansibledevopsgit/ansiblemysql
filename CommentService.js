      
  
     const { IComment } = require('./IComment');
    // const  dbMysql  = require('./db');
    
     var mysql = require('mysql');

     var   Comment     = new IComment();
      

        var connection = mysql.createConnection({
            host     : '192.168.1.106',
            port     :  3306,
            user     : 'user66',
            password : '1234',
            database : 'accounting'
        });

    function  CreateTable(){
     
        const createSql = 'CREATE TABLE  Tbl_Comment (Comment_ID  INT AUTO_INCREMENT    PRIMARY KEY  NOT NULL  , Comment_UserID  INT NOT NULL , Comment_ProductID INT NOT NULL , Comment_Text VARCHAR(255)   NULL, Comment_DateTime VARCHAR(100)   NULL  ); '
        connection.query(createSql,(err, result) => {
            if(err) {
                console.error(err);
            }
            // rows fetch
            console.log("create "+result);
        });
        
    }

   async function Insert( _IComment )   {
            comment =_IComment; 
            const insertSql = 'INSERT INTO  tbl_comment (Comment_UserID,Comment_ProductID,Comment_Text,Comment_DateTime) VALUES (?,?,?,?)'
            const state = await new Promise((resolve, reject) => {
                connection.query(insertSql, [comment.comment_userid, comment.comment_productid, comment.comment_text,comment.comment_datetime], function (err, result, fields){
                                if (err) throw err;
                                if ((parseInt(result["affectedRows"])) > 0) { 
                                    resolve(true);
                                }else{
                                    resolve(false);
                                }
                            });
                        });
            return  state;
    }

    async function Update( _IComment ) {
        comment =_IComment; 
        const updateSql = 'UPDATE  tbl_comment SET    Comment_UserID=?,Comment_ProductID=?,Comment_Text=?,Comment_DateTime=?  WHERE Comment_ID=?'
        const state = await new Promise((resolve, reject) => {
            connection.query(updateSql, [comment.comment_userid, comment.comment_productid, comment.comment_text,comment.comment_datetime, comment.comment_id], function (err, result, fields){
                            if (err) throw err;
                            if ((parseInt(result["affectedRows"])) > 0) { 
                                resolve(true);
                            }else{
                                resolve(false);
                            }
                    });
               });
         return  state;
    }
   async function Delete( CommentID ) {
        const  deleteSql = 'DELETE FROM  tbl_comment   WHERE  Comment_ID=?'
        const  state = await new Promise((resolve, reject) => {
            connection.query(deleteSql, [CommentID], function (err, result, fields){
                            if (err) throw err;
                            if ((parseInt(result["affectedRows"])) > 0) { 
                                resolve(true);
                            }else{
                                resolve(false);
                            }
                    });
                });
       return  state;
  
    }
 
    async function  GetByID ( CommentID  )  {
        const  selectSql = 'SELECT * FROM  tbl_comment   WHERE  Comment_ID=?';
        const  resultComment = await new Promise((resolve, reject) => {
            connection.query(selectSql, [CommentID], function (err, result, fields){
                            if (err) throw err;
   
                            resolve(result);
                    });
                });
       return  resultComment;
    }

    async function GetAll() {
        const  selectSql = 'SELECT * FROM  tbl_comment';
        const  resultComment = await new Promise((resolve, reject) => {
            connection.query(selectSql, function (err, result, fields){
                            if (err) throw err;
   
                            resolve(result);
                    });
                });
       return  resultComment;
    }

    module.exports ={
        
        CreateTable,
           GetAll,
           GetByID,
           Delete,
           Update,
           Insert
         
    }

 