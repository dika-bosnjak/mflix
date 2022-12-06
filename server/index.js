import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import MoviesDAO from "./dao/moviesDAO.js"
import CommentsDAO from "./dao/commentsDAO.js"

//use .env variables
dotenv.config()
//get the port info from the database
const port = process.env.PORT 

//use mongoclient to create the connection to the database
const MongoClient = mongodb.MongoClient
//connect to the database using mongo uri
MongoClient.connect(
    process.env.MONGOURI, {}
)
//catch the error
.catch(err => {
    console.error(err.error)
    process.exit(1)
})
//if there is no error, connect to the collections
.then(async client => {
    await MoviesDAO.injectDB(client)
    await CommentsDAO.injectDB(client)
    //start the server on the defined port
    app.listen(port, () => {
        console.log("Listening on port: " + process.env.PORT);
    })
})