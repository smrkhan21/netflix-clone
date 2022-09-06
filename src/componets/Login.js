import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from './firebaseConfig';

function Login() {
  const app = initializeApp(firebaseConfig);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isUserExist, setUserExist] = useState(false);
  const [isEmailUsed, setEmailUsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname === '/login' ? true : false;

  const clickHandler = (e) => {
    e.preventDefault();
    const auth = getAuth();
    if (page) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          navigate("/dashboard");
          // ...
        })
        .catch((err) => {
          setUserExist(true);
        });
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          navigate("/login")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setEmailUsed(true);
          // ..
        });
    }
  }

  useEffect(() => {
    return () => {
      setEmailUsed(false);
      setUserExist(false);
    };
  }, [email, password]);

  return (
    <div className="login">
      <div className="holder">
        <h1 className="text-white">{page ? "Sign In" : "Register"}</h1>
        <br />
        <form>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" />
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" />
          <button className="btn btn-danger btn-block" onClick={clickHandler}>
            {page ? "Sign In" : "Register"}
          </button>
          <br />
          {error && <p className='text-danger'>{error}</p>}
          {page &&
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label className="form-check-label text-white" htmlFor="flexCheckDefault">
                Remember Me
              </label>
            </div>
          }
        </form>
        <br />
        <br />
        {isUserExist && <p className="text-danger">User does not exist | Go for Signup</p>}
        {isEmailUsed && <p className="text-danger">Email already in use | Go for Sign In</p>}
        <div className="login-form-other">
          <div className="login-signup-now">
            {page ? 'New to Netflix?' : 'Existing User'} &nbsp;
            <Link className=" " to={page ? '/register' : '/login'}>
              {page ? 'Sign up now' : 'Sign In'}
            </Link>.
          </div>
        </div>
      </div>
      <div className="shadow"></div>
      <img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="" />
    </div>
  );
}

export default Login;
