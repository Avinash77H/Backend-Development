import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/Constant";

function Login() {
  const [emailId, setEmailId] = useState("avinash@gmail.com");
  const [password, setPassword] = useState("Avinash@1234");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const nevigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        baseUrl + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      nevigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>

          {/* email */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">email</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter Email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>

          {/* password */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">password</legend>
            <input
              type="password"
              className="input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center mt-1">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
          <p className="text-center hover:text-primary"><Link to={"/signup"}>New User? Signup Hear</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
