import React, { useState } from 'react'
import './auth.css'


function SignUpForm({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    function handleSubmit(e) {
      e.preventDefault();
      setErrors([]);
      setIsLoading(true);
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          password_confirmation: passwordConfirmation,
          first_name,
          last_name
        }),
      }).then((res) => {
        setIsLoading(false);
        if (res.ok) {
          res.json().then((user) => onLogin(user));
        } else {
          res.json().then((err) => setErrors(err.errors));
        }
      });
    }
  
    return (
      <form className="authForm" onSubmit={handleSubmit}>
            <div className="authFormContent">
                <label className="authLabel"
                htmlFor="email">Email</label>
                <input
                    className="authInput"
                    type="text"
                    id="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="authLabel"
                htmlFor="password">Password</label>
                <input
                    className="authInput"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
                <label className="authLabel"
                htmlFor="password">Password Confirmation</label>
                <input
                    className="authInput"
                    type="password"
                    id="password_confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    autoComplete="current-password"
                />
                <label className="authLabel"
                htmlFor="first_name">First Name</label>
                <input
                    className="authInput"
                    type="text"
                    id="first_name"
                    autoComplete="off"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label className="authLabel"
                htmlFor="last_name">Last Name</label>
                <input
                    className="authInput"
                    type="text"
                    id="last_name"
                    autoComplete="off"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <button className="authButton" type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
            </div>
      </form>
    );
}

export default SignUpForm