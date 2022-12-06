import CommentsDAO from "../dao/commentsDAO.js"

export default class CommentsController {
  //function to create the comment for a movie
  static async createComment(req, res, next) {
    try {
      //get the comment id from the url
      const movieId = req.body.movie_id
      //get the comment text from body
      const comment = req.body.text
      //get the user info
      const name = req.body.name
      const email =  req.body.email
      //get the current date
      let date = new Date()
      date.setTime( date.getTime() - new Date().getTimezoneOffset()*60*1000 );

      //add the comment in the database
      await CommentsDAO.addComment( movieId, name, email, comment, date )
      res.json({ status: "success" })
    } catch (e) {
      //in case that there is an error, display it
      res.status(500).json({ error: e })
    }
  }

  //function to update the comment in the database
  static async updateComment(req, res, next) {
    try {
       //get the comment id from the url
      const commentId = req.body.comment_id
      //get the comment text from body
      const comment = req.body.text
      //get the current date
      let date = new Date()
      date.setTime( date.getTime() - new Date().getTimezoneOffset()*60*1000 );

      //update the record in the database
      const commentResponse = await CommentsDAO.updateComment( commentId, req.body.email, comment, date )

      //check for errors
      var { error } = commentResponse
      if (error) {
        res.status(400).json({ error })
      }

      //if there is no modified row, display error
      if (commentResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update comment - user may not be original poster",
        )
      }
      res.json({ status: "success" })
    } catch (e) {
      //catch the error
      res.status(500).json({ error: e.message })
    }
  }

  //function to delete the comment in the database
  static async deleteComment(req, res, next) {
    try {
      //get the comment id from the url
      const commentId = req.query.id
      //get the user email
      const email = req.body.email
      // delete the record in the database
      await CommentsDAO.deleteComment( commentId, email )
      res.json({ status: "success" })
    } catch (e) {
      //catch the error
      res.status(500).json({ error: e.message })
    }
  }

}