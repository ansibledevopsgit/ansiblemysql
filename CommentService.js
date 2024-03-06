      
  
     const { IComment } = require('./IComment');
     const  dbMysql  = require('./db');
    
     var   Comment     = new IComment();
      

    function Connection() {
         CreateTable();
    }

      function  CreateTable(){
     
        const createSql = 'CREATE TABLE IF NOT EXISTS Tbl_Comment (Comment_ID  INT AUTO_INCREMENT    PRIMARY KEY  NOT NULL  , Comment_UserID  INT NOT NULL , Comment_ProductID INT NOT NULL , Comment_Text VARCHAR(255)   NULL, Comment_DateTime VARCHAR(100)   NULL  ); '
        dbMysql.query(createSql,(err, result) => {
            if(err) {
               // console.error(err);
            }
            // rows fetch
            console.log(result);
        });
        
    }

   async function Insert( _IComment )   {
            comment =_IComment; 
            const insertSql = 'INSERT INTO  tbl_comment (Comment_UserID,Comment_ProductID,Comment_Text,Comment_DateTime) VALUES (?,?,?,?)'
            const state = await new Promise((resolve, reject) => {
                            dbMysql.query(insertSql, [comment.comment_userid, comment.comment_productid, comment.comment_text,comment.comment_datetime], function (err, result, fields){
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
                    dbMysql.query(updateSql, [comment.comment_userid, comment.comment_productid, comment.comment_text,comment.comment_datetime, comment.comment_id], function (err, result, fields){
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
                    dbMysql.query(deleteSql, [CommentID], function (err, result, fields){
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
                    dbMysql.query(selectSql, [CommentID], function (err, result, fields){
                            if (err) throw err;
   
                            resolve(result);
                    });
                });
       return  resultComment;
    }

    async function GetAll() {
        const  selectSql = 'SELECT * FROM  tbl_comment';
        const  resultComment = await new Promise((resolve, reject) => {
                    dbMysql.query(selectSql, function (err, result, fields){
                            if (err) throw err;
   
                            resolve(result);
                    });
                });
       return  resultComment;
    }

    module.exports ={
        Connection ,
           GetAll,
           GetByID,
           Delete,
           Update,
           Insert
         
    }

 