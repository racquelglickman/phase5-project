import React, { useState } from 'react'
import './auth.css'


function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    .then((res) => {
      setIsLoading(false);
      if (res.ok) {
          res.json().then((user) => onLogin(user));
      } else {
          res.json().then((err) => setErrors(err.errors));
      }
      });
  }

  return (
    <form className='authForm' onSubmit={handleSubmit}>
        <div className='authFormContent'>
            <label className='authLabel' htmlFor='email'>Email</label>
            <input
                className='authInput'
                type="text"
                id='email'
                autoComplete='off'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label className='authLabel' htmlFor='password'>Password</label>
            <input
                className='authInput'
                type="password"
                id='password'
                autoComplete='current-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button 
                className='authButton'
                id='loginButton'
                variant='fill'
                color='primary'
                type="submit"
              >{isLoading ? "Loading..." : "Login"}
            </button>
        </div>
    </form>
  );
}

export default LoginForm