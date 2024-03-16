      
  
     const { IComment } = require('./IComment');
     const  connection  = require('./db');
     var    comment     = new IComment();
      

    function  CreateTable(){
     
        const createSql = 'CREATE TABLE  Tbl_Comment (Comment_ID  INT AUTO_INCREMENT    PRIMARY KEY  NOT NULL  , Comment_UserID  INT NOT NULL , Comment_ProductID INT NOT NULL , Comment_Text VARCHAR(255)   NULL, Comment_DateTime VARCHAR(100)   NULL  ); '
         
        connection.query(createSql, function (err, result) {
            if (err) console.log("Table create Error");
            console.log("Table created");
          });
    }

   async function Insert( _IComment )   {
            comment =_IComment; 
            const insertSql = 'INSERT INTO  tbl_comment (Comment_UserID,Comment_ProductID,Comment_Text,Comment_DateTime) VALUES (?,?,?,?)'
            const  state = await new Promise((resolve, reject) => {
            connection.query(insertSql,  [comment.comment_userid, comment.comment_productid, comment.comment_text,comment.comment_datetime], function (err, result, fields){
                                    if (err) console.log("  INSERT  Error");
                                    // if ( parseInt(result.affectedRows) > 0) { 
                                    //     resolve(true);
                                    // }else{
                                    //     resolve(false);
                                    // }
                                    console.log("   log result   " + result);
                                    resolve(true);
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

 