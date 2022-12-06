import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movie";
import { Link } from "react-router-dom";

function MoviesList () {
  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [searchTitle, setSearchTitle ] = useState("");
  const [searchGenre, setSearchGenre ] = useState("");
  const [searchLanguage, setSearchLanguage ] = useState("");
  const [genres, setGenres] = useState(["All Genres"]);
  const [languages, setLanguages] = useState(["All Languages"]);

  useEffect(() => {
    retrieveMovies();
    retrieveGenres();
    retrieveLanguages();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const onChangeSearchGenres = e => {
    const searchGenre = e.target.value;
    setSearchGenre(searchGenre);
  };

  const onChangeSearchLanguage = e => {
    const searchLanguage = e.target.value;
    setSearchLanguage(searchLanguage);
    
  };

  const retrieveMovies = () => {
    MovieDataService.getAll()
      .then(response => { 
        setTotalMovies(response.data.total_results)
        setMovies(response.data.movies) })
      .catch(e => { console.log(e) });
  };

  const retrieveGenres = () => {
    MovieDataService.getGenres()
      .then(response => { setGenres(["All Genres"].concat(response.data)) })
      .catch(e => {  console.log(e) });
  };

  const retrieveLanguages = () => {
    MovieDataService.getLanguages()
      .then(response => { setLanguages(["All Languages"].concat(response.data)) })
      .catch(e => {  console.log(e) });
  };

  const refreshList = () => {
    retrieveMovies();
  };

  const find = (query, by) => {
    MovieDataService.find(query, by)
      .then(response => { 
        setTotalMovies(response.data.total_results)
        setMovies(response.data.movies); })
      .catch(e => { console.log(e) });
  };

  const findByTitle = () => {
    find(searchTitle, "title")
  };

  const findByGenre = () => {
    find(searchGenre, "genres")
  };

  const findByLanguage = () => {
    if (searchLanguage == "All Languages") { refreshList(); } 
    else { find(searchLanguage, "languages") }
  };

  return (
    <div>
      <div className="row py-4">

        <h6>Filters</h6>

        {/* Search by title  */}
        <div className="input-group col">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary mx-2" type="button" onClick={findByTitle} > Search  </button>
          </div>
        </div>

        {/* Search by genres  */}
        <div className="input-group col">
          <select onChange={onChangeSearchGenres} className="form-control custom-select">
             {genres.map(genre => { return (  <option value={genre}> {genre} </option> ) })}
          </select>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary  mx-2" type="button" onClick={findByGenre} > Search </button>
          </div>
        </div>



        {/* Search by language  */}
        <div className="input-group col">
          <select onChange={onChangeSearchLanguage} className="form-control custom-select">
          {languages.map(language => { return (  <option value={language}> {language} </option> ) })}
          </select>
          <div className="input-group-append">
          <button className="btn btn-outline-secondary  mx-2" type="button" onClick={findByLanguage} > Search </button>
          </div>
        </div>
      </div>

      <h6>Total Movies: {totalMovies}</h6>

     {/* Display list of movies */}
      <div className="row">
        {movies.map((movie) => {
          return (
            <div className="col-lg-4 pb-4 px-2">
              <div className="card">
                <div className="card-body">
                  <div className=" d-flex justify-content-center">
                  <img src={movie.poster ? movie.poster : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"} className="rounded" height="200px"/>
                  </div>
                  <h5 className="card-title text-success text-center">{movie.title}</h5>
                  <p className="card-text container mx-4">
                    <strong>Languages: </strong>{movie.languages ? movie.languages.map((l) => l + "; ") : "No info"}<br/>
                    <strong>Genres: </strong>{movie.genres? movie.genres.map((g) => g + "; ") : "No info"}<br/>
                    <strong>Plot: </strong>{movie.plot ? movie.plot.substring(0,70): "..."}...
                  </p>
                  <div className="row  d-flex justify-content-center">
                  <Link to={"/movies/"+movie._id} className="btn btn-success col-lg-5 mx-1 mb-1"> View Comments </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default MoviesList;