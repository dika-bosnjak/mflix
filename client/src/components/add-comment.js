import React, { useState } from "react";
import MovieDataService from "../services/movie";
import { Link, useParams, useLocation } from "react-router-dom";

const AddComment = (props) => {
  let initialCommentState = ""
  let editing = false;

  let dataLoc = useLocation();
  console.log(dataLoc);
  let {id} = useParams();

  if (dataLoc.state && dataLoc.state.currentComment) {
    editing = true;
    initialCommentState = dataLoc.state.currentComment.text
  }

  const [comment, setComment] = useState(initialCommentState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    setComment(event.target.value);
  };

  const saveComment = () => {
    var data = {
      text: comment,
      name: props.user.name,
      email: props.user.email,
      movie_id: id
    };
    console.log(editing)

    if (editing) {
      data.comment_id = dataLoc.state.currentComment._id
      MovieDataService.updateComment(data)
        .then(response => {
          setSubmitted(true);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      MovieDataService.createComment(data)
        .then(response => {
          setSubmitted(true);
        })
        .catch(e => {
          console.log(e);
        });
    }

  };

  return (
    <div>
      {props.user ? (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/movies/" + id} className="btn btn-success"> Back to Movie </Link>
          </div>) : 
          ( <div>
              <div className="form-group">
                <label htmlFor="description">{ editing ? "Edit" : "Create" } Comment</label>
                <input type="text" className="form-control my-4"  id="text" required value={comment} onChange={handleInputChange} name="text" />
              </div>
              <button onClick={saveComment} className="btn btn-success"> Submit </button>
          </div>
        )}
      </div> ) : ( <div>  Please log in. </div> )}
    </div>
  );
};

export default AddComment;