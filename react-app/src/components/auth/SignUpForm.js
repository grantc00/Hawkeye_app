import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { ErrorBar } from "recharts";
import { signUp } from "../../store/session";
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [usersname, setUsersname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buyingPower, setBuyingPower] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const errors = [];
    if (password !== confirmPassword)
      errors.push("Those passwords didn’t match. Try again.");
    // if (usersname.length <= 0) errors.push("Please enter an username");
    // if (email.length <= 0 || !email.includes("@"))
    //   errors.push("Please enter an valid email address");
    if (buyingPower < 0) errors.push("Buying Power must be more than $0");
    setErrors(errors);
  }, [password, confirmPassword, buyingPower]);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(usersname, email, password, buyingPower)
      );
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsersname(e.target.value);
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

  const updateBuyingPower = (e) => {
    setBuyingPower(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form className='signup-form' onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type="text"
          name="usersname"
          onChange={updateUsername}
          value={usersname}
          required={true}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          required={true}
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
      <div>
        <label>Buying Power</label>
        <input
          type="number"
          name="buying_power"
          onChange={updateBuyingPower}
          value={buyingPower}
          required={true}
        />
      </div>
      <button className='signup-button' type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
