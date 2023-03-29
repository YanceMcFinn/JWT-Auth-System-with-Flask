import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const [userData, setUserData] = useState("")
  const token = localStorage.getItem("token");

  const getUser = async () => {
    const user = await actions.getUserData();
    setUserData(user);
  };
    
  useEffect(() => {
    store.token && store.token != "" && store.token != undefined && getUser();
  }, [store.token]);

  
  return (
  <div> {store.token && store.token != "" && store.token != undefined ? (
    <div className="text-center text-success">
      <h1 >ACCESS GRANTED </h1>
      <h4> Credentials verified. Thank you.</h4> 
    </div>
  ) : (
    <div className="text-center text-danger">
      <h2>ACCESS DENIED</h2>
      <p>please login or register to access private information</p>
    </div>
  )}
  </div> 
  )
};

