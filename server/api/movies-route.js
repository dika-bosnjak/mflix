import express from "express"
import MoviesController from "./movies-controller.js"
import CommentsController from "./comments-controller.js"

//use react router
const router = express.Router()

router.route("/").get(MoviesController.getMovies)
router.route("/languages").get(MoviesController.getMoviesLanguages)
router.route("/genres").get(MoviesController.getMoviesGenres)
router.route("/:id").get(MoviesController.getMovieById)

router.route("/comment")
        .post(CommentsController.createComment)
        .put(CommentsController.updateComment)
        .delete(CommentsController.deleteComment)

export default router