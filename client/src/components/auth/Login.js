import React, { useEffect } from "react";
import BgImage from "./BgImage";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postLogin } from "../../store/asyncMethods/AuthMethods";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const {loginError, loading} = useSelector((state) => state.AuthReducer)

  const handleInputs = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const userLogin = (e) => {
    e.preventDefault();
    dispatch(postLogin(state));
  };

  useEffect(() =>{
    if(loginError.length > 0){
      loginError.map(error => toast.error(error.msg))
    }
  },[loginError])

  return (
    <>
      <Helmet>
        <title>User Login</title>
        <meta name="description" content="User login form" />
      </Helmet>
      <div className="row mt-80">
        <div className="col-8">
          <BgImage />
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              className: "",
              style: {
                fontSize: "14px",
              },
            }}
          />
        </div>
        <div className="col-4">
          <div className="account">
            <div className="account__section">
              <form onSubmit={userLogin}>
                <div className="group">
                  <h3 className="form-heading">Login</h3>
                </div>
                <div className="group">
                  <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleInputs}
                    className="group__control"
                    placeholder="Enter email"
                  />
                </div>
                <div className="group">
                  <input
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleInputs}
                    className="group__control"
                    placeholder="Enter password"
                  />
                </div>
                <div className="group">
                  <input
                    type="submit"
                    className="btn btn-default btn-block"
                    value={loading ? 'Loading...': "Login"}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
