import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movie";
import { Link, useParams } from "react-router-dom";

function Movie (props) {

  let {id} = useParams();
  const initialMovieState = { id: null, title: "", genres: {}, languages: "", comments: [] };
  const [movie, setMovie] = useState(initialMovieState);

  const getMovie = id => {
    MovieDataService.get(id)
      .then(response => {
        console.log(response)
        setMovie(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getMovie(id);
  }, [id]);

  const deleteComment = (commentId, index) => {
    console.log(props.user);
    MovieDataService.deleteComment(commentId, props.user.email)
      .then(response => {
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {movie ? (
        <div className="container row">
          <h2 className="mb-3 mt-5 text-success">{movie.title}</h2>
          <div className="col-6 d-flex justify-content-center">
          <img src={movie.poster ? movie.poster : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"} className="rounded" height={400}/>
          </div>
          <div className="col-6">
            <p className="mt-5 pt-5">
            <strong>Genres: </strong>{movie.genres && movie.genres.length > 1 ? movie.genres.map((g) => g + "; ") : "No info"}<br/>
              <strong>Language: </strong>{movie.languages ? movie.languages.map((l) => l + "; ") : "No info"}<br/>
              <strong>Plot: </strong>{movie.plot ? movie.plot: "..."}<br/>
              <strong>Published: </strong>{movie.year ? movie.year: "No info"}<br/>
              <strong>IMDB Rating: </strong>{movie.imdb ? movie.imdb.rating + "(based on " + movie.imdb.votes + " votes)": "No info"}
            </p>
            <Link to={"/movies/" + id + "/comment"} className="btn btn-success"> Add Comment </Link>
          </div>
          

          



          <h4 className="mt-4"> Comments </h4>
          <div className="row">
            {movie.comments.length > 0 ? (
             movie.comments.map((comment, index) => {
               return (
                <div className="row mb-4">
                 <div className="col-lg-4 pb-1" key={index}>
                   <div className="card">
                     <div className="card-body">
                       <p className="card-text">
                         {comment.text}<br/>
                         <strong>User: </strong>{comment.name}<br/>
                         <strong>Date: </strong>{comment.date}
                       </p>
                       {props.user && props.user.email === comment.email &&
                          <div className="row">
                            <a onClick={() => deleteComment(comment._id, index)} className="btn btn-danger col-lg-5 mx-1 mb-1">Delete</a>
                            <Link to={"/movies/" + id + "/comment"} state={{ currentComment: comment}}  className="btn btn-secondary col-lg-5 mx-1 mb-1">Edit</Link>
                          </div>                   
                       }
                     </div>
                   </div>
                 </div>
                 </div>
               );
             })
            ) : (
            <div className="col-sm-4">
              <p>No comments yet.</p>
            </div>
            )}

          </div>

        </div>
      ) : (
        <div> <br />  <p>No movie selected.</p>
        </div>
      )}
    </div>
  );
};

export default Movie;