import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    accountType: "shark", // default or pitcher
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", formData);
      // On success, redirect to login
      navigate("/login");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input name="username" placeholder="Username" onChange={onChange} />
        <input name="email" type="email" placeholder="Email" onChange={onChange} />
        <input name="password" type="password" placeholder="Password" onChange={onChange} />
        
        <select name="accountType" onChange={onChange}>
          <option value="shark">Shark</option>
          <option value="pitcher">Pitcher</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;