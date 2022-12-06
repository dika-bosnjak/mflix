import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let commentsCollection

export default class CommentsDAO {

   //get the connection the the collection "comments" and store it in the commentsCollection variable
  static async injectDB(conn) {
    if (commentsCollection) { return }
    try {
      commentsCollection = await conn.db(process.env.DATABASE).collection("comments")
    } catch (e) {
        console.error(`Unable to establish collection handles in commentsDAO: ${e}`)
    }
  }


  //function to add new comment in the database
  static async addComment(movieId, name, email, text, date) {
    try {
      const commentDoc = { 
          name: name,
          email: email,
          date: date,
          text: text,
          movie_id: ObjectId(movieId) }
      
      //insert new comment in the collection
      return await commentsCollection.insertOne(commentDoc)
    } catch (e) {
      //catch the error
      console.error(`Unable to post comment: ${e}`)
      return { error: e }
    }
  }


  //function to update the comment in the database
  static async updateComment(commentId, email, text, date) {
    try {
      //update one comment where the user email is email from the request, and id of the comment is the one from the request
      //update text and date
      const updateResponse = await commentsCollection.updateOne(
        { email: email, _id: ObjectId(commentId)},
        { $set: { text: text, date: date  } },
      )
      return updateResponse
    } catch (e) {
      //catch the error
      console.error(`Unable to update comment: ${e}`)
      return { error: e }
    }
  }


  //function to delete the comment in the database
  static async deleteComment(commentId, email) {
    try {
      console.log(commentId, email)
      //delete one comment where the user email is email from the request, and id of the comment is the one from the request
      const deleteResponse = await commentsCollection.deleteOne({
        _id: ObjectId(commentId),
        email: email,
      })
      console.log(deleteResponse);
      return deleteResponse
    } catch (e) {
      //catch the response
      console.error(`Unable to delete comment: ${e}`)
      return { error: e }
    }
  }

}