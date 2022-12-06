import MoviesDAO from "../dao/moviesDAO.js"

export default class MoviesController {

  //function to get movies from the database
  static async getMovies(req, res, next) {
    const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    //enable filters, per genre, language or movie title
    let filters = {}
    if (req.query.genres) {
        filters.genres = req.query.genres
    } else if (req.query.languages) {
        filters.languages = req.query.languages
    } else if (req.query.title) {
        filters.title = req.query.title
    }
    //use dao (data access object) to get movies from mongo db
    const { moviesList, totalNumberOfMovies } = await MoviesDAO.getMovies({ filters, page, moviesPerPage })
    //return the response with the list of the movies
    let response = {
        movies: moviesList,
        page: page,
        filters: filters,
        entries_per_page: moviesPerPage,
        total_results: totalNumberOfMovies,
    }
    res.json(response)
  }

  //function to get movie by id
  static async getMovieById(req, res, next) {
    try {
      //get the id from the url
      let id = req.params.id || {}
      //get the movie data using data access object
      let movie = await MoviesDAO.getMovieById(id)
      //if there is no movie with that id, display error
      if (!movie) {
        res.status(404).json({ error: "Not found" })
        return
      }
      //else, return the movie
      res.json(movie)
    } catch (e) {
      //in case that there is an error, display it
      console.log(e)
      res.status(500).json({ error: e })
     }
    }
    
  //function to get all genres that are present in movies
  static async getMoviesGenres(req, res, next) {
    try {
      //get the genres using data access object
      let genres = await MoviesDAO.getGenres()
      //return the genres
      res.json(genres)
    } catch (e) {
      //in case that there is an error, display it
      console.log(`api, ${e}`)
      res.status(500).json({ error: e.error })
    }
  }

    //function to get all languages that are present in movies
    static async getMoviesLanguages(req, res, next) {
      try {
        //get the languages using data access object
        let languages = await MoviesDAO.getLanguages()
        //return the languages
        res.json(languages)
      } catch (e) {
        //in case that there is an error, display it
        console.log(`api, ${e}`)
        res.status(500).json({ error: e.error })
      }
    }
}