import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", formData);
      const { token, user } = res.data;
      
      // Save token to local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on accountType
      if (user.accountType === "shark") {
        navigate("/shark");
      } else {
        navigate("/pitcher");
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={onChange} />
        <input name="password" type="password" placeholder="Password" onChange={onChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;