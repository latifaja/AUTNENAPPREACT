import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import './Signup.css';
import logo from './images/ensetlogo.png';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:3000/users', { name, email, password });
      navigate('/');
    } catch (error) {
      console.error(error);
      setErrors({ submit: 'Failed to create account. Please try again.' });
    }
  };

  return (
    <div className='container'>
    <div className="auth-container">
    <div className="logo-container">
          <img src={logo} alt="Logo ENSET" />
        </div>

      <div className="form-group">
        <label>Name</label>
        <div className="input-with-icon">
          <i className="bi bi-person"></i>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Email address</label>
        <div className="input-with-icon">
          <i className="bi bi-envelope"></i>
          <input
            type="email"
            placeholder=" email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Password</label>
        <div className="input-with-icon">
          <i className="bi bi-lock"></i>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <div className="input-with-icon">
          <i className="bi bi-lock"></i>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
      </div>

      {errors.submit && <span className="error">{errors.submit}</span>}

      <button className="auth-button" onClick={handleSignup}>Sign Up</button>
      <p className="auth-link">
         <Link to="/">Already registered? Click to Login !!</Link>
      </p>
    </div>
    </div>
  );
}

export default Signup;