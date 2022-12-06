import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {

  const navigate = useNavigate();

  const initialUserState = {
    name: "",
    email: "",
  };

  const [logInUser, setlogInUser] = useState(initialUserState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setlogInUser({ ...logInUser, [name]: value });
  };

  const login = () => {
   props.login(logInUser)
    navigate("/");
  }

  return (
    <div className="submit-form container w-50">
      <div>
        <div className="form-group mb-3">
          <label htmlFor="user">Username</label>
          <input type="text" className="form-control" id="name" required value={logInUser.name} onChange={handleInputChange} name="name" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" className="form-control" id="email" required value={logInUser.email} onChange={handleInputChange} name="email" />
        </div>

        <button onClick={login} className="btn btn-success mt-4"> Login </button>
      </div>
    </div>
  );
};

export default Login;