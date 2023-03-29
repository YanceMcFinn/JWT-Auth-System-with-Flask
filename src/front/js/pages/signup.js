import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  console.log("This is your token", store.token);

  const handleClick = () => {
    actions.signup(email, password)
  };

  if(store.token && store.token != "" && store.token != undefined){
	navigate("/login")
  };

  return (
    <div className="container-fluid">
        <div className="row text-center">
            <h2>Sign Up</h2>
        </div>
        <form>
            <div className="row mx-auto justify-content-center">
                    <div className="form-group col-md-4">
                        <label htmlFor="inputEmail4">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            name="email" id="inputEmail4" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputPassword4">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="inputPassword4" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                    </div>
            </div>
            <div className="row justify-content-center">
                
                    <button type="submit" className="btn btn-primary mx-auto mt-2 signup-button" onClick={handleClick}>Sign up</button>
            </div>
        </form>
    </div>
  );
};