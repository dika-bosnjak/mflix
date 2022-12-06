import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let moviesCollection

export default class MoviesDAO {

    //get the connection the the collection "movies" and store it in the moviesCollection variable
    static async injectDB(conn) {
        if (moviesCollection) { return }
        try {
            moviesCollection = await conn.db(process.env.DATABASE).collection("movies")
        } catch (e) {
            console.log(`Unable to establish a collection handle in moviesDAO: ${e}`)
        }
    }

    //get the movie genres 
    static async getGenres() {
        //prepare the array
        let genres = []
        try {
            //populate the array with the distinct values of genres from the database
          genres = await moviesCollection.distinct("genres")
          return genres
        } catch (e) {
          console.error(`Unable to get genres, ${e}`)
          return genres
        }
      }

        //get the movie languages 
        static async getLanguages() {
            //prepare the array
            let languages = []
            try {
                //populate the array with the distinct values of languages from the database
                languages = await moviesCollection.distinct("languages")
              return languages
            } catch (e) {
              console.error(`Unable to get languages, ${e}`)
              return languages
            }
          }

    //get the movies from the database
    static async getMovies({ filters = null, page = 0, moviesPerPage = 20, } = {}) {
        //prepare the query based on filters
        let query
        if(filters) {
            if ("title" in filters) {
                query = { $text: { $search: filters["title"]}}
            } else if ("genres" in filters) {
                query = { "genres": { $eq: filters["genres"]}} 
            } else if ("languages" in filters) {
                query = { "languages": { $eq: filters["languages"]}} 
            }
        }

        try {
            //use the collection to access the database and find the results
            const result = await moviesCollection.find(query)
            const displayResult = result.limit(moviesPerPage).skip(moviesPerPage * page)
            const moviesList = await displayResult.toArray()
            const totalNumberOfMovies = await moviesCollection.countDocuments(query) 

            return { moviesList, totalNumberOfMovies}
        } catch (e) {
            console.log(`Unable to issue find command, ${e}`);
            return { moviesList: []}
        }
    }

    //get the movies by the id
    static async getMovieById(id) {
        try {
        //create the pipeline, find the results that match the queried id, and lookup for comments where the movie id is the queried id, sort by date
          const pipeline = [
                {  $match: {  _id: new ObjectId(id) } },
                {  $lookup: {
                        from: "comments",
                        let: { id: "$_id" },
                        pipeline: [ { $match: { $expr: { $eq: ["$movie_id", "$$id"] }}}, { $sort: { date: -1 }}],
                        as: "comments",
                    },
                },
                {  $addFields: { comments: "$comments" }, },
            ]

        //return the result from the database
          return await moviesCollection.aggregate(pipeline).next()
        } catch (e) {
            //catch the error
          console.error(`Something went wrong in getMovieById: ${e}`)
          throw e
        }
      }
    

    
}