

const express = require("express");
const cors = require('cors');
const  mysql  = require('mysql');
var os = require('os');
const {  IComment  } = require("./IComment");
const  commentservice  = require('./CommentService');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const hostname = '109.122.224.141';
const port = 8000;
  
 

   app.get("/",(req,res)=>{
    
     res.send("welcome my app MYSQL");
   });
   
   app.get("/Create",(req,res)=>{
      commentservice.Connection();
      res.send("Create  MYSQL");
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
   
   app.get("/GetAll", async (req,res)=>{
   
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
   
   app.get("/Insert",async(req,res)=>{
   
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


  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

 