import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { ErrorBar } from "recharts";
import { signUp } from "../../store/session";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const errors = [];
    if (password !== confirmPassword)
      errors.push("Those passwords didn’t match. Try again.");
    if (username.length <= 0) errors.push("Please enter an username");
    if (email.length <= 0 || !email.includes("@"))
      errors.push("Please enter an valid email address");
    setErrors(errors);
  }, [username,email, password, confirmPassword]);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateConfirmPassword}
          value={confirmPassword}
          required={true}
        ></input>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
