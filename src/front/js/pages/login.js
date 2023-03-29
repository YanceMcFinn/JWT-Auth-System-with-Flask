import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginFailed = store.loginFailed

  console.log("This is your token", store.token);
  console.log(loginFailed)

  const handleClick = () => {
    actions.login(email, password)
  };

  if(store.token && store.token != "" && store.token != undefined){
	navigate("/")
  };

  return (
    <div className="container-fluid">
    <div className="text-center mt-5">
      <h1>Login</h1>

      {store.token && store.token != "" && store.token != undefined ? (
        "You are logged in with this token " + store.token
      ) : (
        <div>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
          className="mx-2"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary mx-2" onClick={handleClick}>Login</button>
          <div className="row">
            <p><i><b>Hint:</b> Use email "test@gmail.com" and password "test" to test login functionality. Or you can just register!</i></p>
          </div>
          <div className="row">
          <Link to="/signup"><button className="btn btn-success signup-link-button mx-auto" href="/signup">Click Here to Sign Up</button> </Link>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};
