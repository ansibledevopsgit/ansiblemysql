


 
  function IComment(Comment_ID,Comment_UserID,Comment_ProductID, Comment_Text,Comment_DateTime) {
    this.comment_id = Comment_ID;
    this.comment_userid = Comment_UserID;
    this.comment_productid = Comment_ProductID;
    this.comment_text = Comment_Text;
    this.comment_datetime = Comment_DateTime;
  }

  module.exports ={
    IComment
  }