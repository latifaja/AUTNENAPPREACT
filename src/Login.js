import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import './Login.css';
import logo from './images/ensetlogo.png';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const res = await axios.get(`http://localhost:3000/users?email=${email}&password=${password}`);
      if (res.data.length > 0) {
        localStorage.setItem('user', JSON.stringify(res.data[0]));
        navigate('/home');
      } else {
        setErrors({ submit: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      setErrors({ submit: 'Failed to login. Please try again.' });
    }
  };

  return (
    <div className="container">
    <div className="auth-container">
    <div className="logo-container">
          <img className=" logo" src={logo} alt="Logo ENSET" />
        </div>

      <div className="form-group">
        <label>Email address</label>
        <div className="input-with-icon">
          <i className="bi bi-envelope"></i>
          <input
            type="email"
            placeholder="email"
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

      {errors.submit && <span className="error">{errors.submit}</span>}

      <button className="auth-button" onClick={handleLogin}>Login</button>
      <p className="auth-link">
         <Link to="/signup">Don't have an account? Sign Up</Link>
      </p>
    </div>
    </div>
  );
}

export default Login;