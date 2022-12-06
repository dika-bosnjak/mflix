import express from "express"
import cors from "cors"
import moviesRouter from "./api/movies-route.js"

//create the express app, and use the middlewares
const app = express()
app.use(cors())
app.use(express.json())

//use movies router
app.use("/movies", moviesRouter)

//for all other routes, display 404 error
app.use("*", (req, res) => res.status(404).json({error: "404 Not found"}))

export default app