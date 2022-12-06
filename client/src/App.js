import React from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddComment from "./components/add-comment";
import Movie from "./components/movies";
import MoviesList from "./components/movies-list";
import Login from "./components/login";

function App() {

  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }
  return (
    <div className="App">

      {/* Navbar */}
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container">
          <a href="/movies" className="navbar-brand"> SIVBP MongoDB Movies Reviews </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item" key="uniqueId1" >
              <Link to={"/movies"} className="nav-link"> Movies </Link>
            </li>
            <li className="nav-item" key="uniqueId2">
              { user ? (  <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}> Logout {user.name} </a>) : ( <Link to={"/login"} className="nav-link"> Login </Link> )}
            </li>
          </div>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
            <Route exact path="/" element={<MoviesList/>} />
            <Route exact path="/movies" element={<MoviesList/>} />

            <Route path="/movies/:id/comment" element={<AddComment user={user} />} />

            <Route path="/movies/:id" element={<Movie user={user} /> } />

            <Route path="/login" element={<Login login={login} /> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
