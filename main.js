

const express = require("express");
const cors    = require('cors');
var   os      = require('os');
const {  IComment  }   = require("./IComment");
const  commentservice  = require('./CommentService');
const  bodyParser      = require('body-parser');
const  app             = express();
//const hostname = 'localhost';
const port = 5000;

  
//CORS middleware
var corsMiddleware = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
   // res.header('Access-Control-Allow-Origin', 'localhost');//replace localhost with actual host
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

    next();
}

app.use(corsMiddleware);
 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

   app.get("/",(req,res)=>{
     res.send("welcome my app MYSQL");
   });

    app.get("/Create",(req,res)=>{
       commentservice.CreateTable();
       res.send("Create  MYSQL");
    });

    app.post("/Insert3",(req,res)=>{
    
        let userID = req.query.UserID;
        const date  = new Date();  
        const  comment = new IComment();
        comment.comment_userid=userID;
        comment.comment_productid=1000;
        comment.comment_text="insert3 comment very good product";
        comment.comment_datetime= date.toString();  
       
        let state = commentservice.Insert3(comment);
            if(state){
                res.send( "Insert3 OK Comment : " + comment );
            }else {
                res.send( "Error Insert3 Comment " );
            }
    
     });

    app.get("/Insert2",(req,res)=>{
    
        const date  = new Date();  
        const  comment = new IComment();
        comment.comment_userid=120;
        comment.comment_productid=1000;
        comment.comment_text="insert2 comment very good product";
        comment.comment_datetime= date.toString();  
       
        let state = commentservice.Insert2(comment);
            if(state){
                res.send( "Insert2 OK Comment : " + comment );
            }else {
                res.send( "Error Insert2 Comment " );
            }
    
     });

   app.post("/Insert",async(req,res)=>{
   
    let userID = req.query.UserID;
    const date  = new Date();  
    const  comment = new IComment();
    comment.comment_userid=userID;
    comment.comment_productid=1000;
    comment.comment_text="insert comment very good product";
    comment.comment_datetime= date.toString();  
   
    await commentservice.Insert(comment).then((state) =>{
        if(state){
            res.send( "Insert OK Comment: " + comment )
        }else {
            res.send( "Error Insert Comment " )
        }
    }).catch((e)=>{  res.send( "Error : " + e )});

});





    app.get("/Delete",async(req,res)=>{
  
        let commentID = req.query.CommentID;
        await  commentservice.Delete(commentID).then((state) =>{
            if(state){
                res.send( "Delete OK Comment: " + commentID )
            }else {
                res.send( "Error Delete Comment " )
            }
        }).catch((e)=>{  res.send( "Error : " + e )});
        
    });

   
   app.get("/GetByID", async (req,res)=>{
     
    let commentID = req.query.CommentID;
    await  commentservice.GetByID(commentID).then((Comment) =>{
         if(Comment != null){
             res.send( " Comment : " + Comment[0].Comment_DateTime )
         }else {
             res.send( " Not Found Comment " )
         }
     }).catch((e)=>{  res.send( "Error : " + e )});
 
   });
   
   app.get("/GetAll",async (req,res)=>{
   
    await  commentservice.GetAll().then((Comments) =>{
        if(Comments != null){
            var Data="";
            Comments.forEach(Comment => {
               Data += `comment_id:${Comment.Comment_ID} , productid:${Comment.Comment_ProductID}  ` + os.EOL;
            });
            res.send(Data)
        }else {
            res.send( "Error Not Found Comments "  )
        }
    }).catch((e)=>{  res.send( "Error : " + e )});
     
   });
   
  
   
   
   app.get("/Update", async(req,res)=>{
        let commentID = req.query.CommentID;
        const date  = new Date();  
        const  comment = new IComment();
        comment.comment_id =commentID;
        comment.comment_userid=10;
        comment.comment_productid=1000;
        comment.comment_text="Update comment very good product";
        comment.comment_datetime= date.toString();  
    
        await commentservice.Update(comment).then((state) =>{
            if(state){
                res.send( "Update OK Comment: " + comment )
            }else {
                res.send( "Error Update Comment " )
            }
        }).catch((e)=>{  res.send( "Error : " + e )});

     
   });


  app.listen(port, () => {
    console.log(`Server running at http://:${port}/`);
  });

 