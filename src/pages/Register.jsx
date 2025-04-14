import React, { useState } from "react";
import { registerUser } from "../api/userService";
import "./css/Register.css"; // 👈 Link your CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "User",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, password, role } = formData;

    if (!fullName || !email || !password || !role) {
      setError("All fields are required");
      return;
    }

    try {
      await registerUser({
        fullName,
        email,
        passwordHash: password,
        role,
      });

      setSuccess("Registration successful!");
      setFormData({ fullName: "", email: "", password: "", role: "User" });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2 className="register-title">Register</h2>

        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="form-input"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-input"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
