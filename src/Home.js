import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Home.css';
import logo from './images/ensetlogo.png';

function Home() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo ENSET" />
        </div>
        <ul>
          <li
            className={activeMenu === 'Dashboard' ? 'active' : ''}
            onClick={() => handleMenuClick('Dashboard')}
          >
            <span className="icon">
              <i className="bi bi-speedometer2"></i>
            </span>{' '}
            Dashboard
          </li>
          <li
            className={activeMenu === 'Products' ? 'active' : ''}
            onClick={() => handleMenuClick('Products')}
          >
            <span className="icon">
              <i className="bi bi-box-seam"></i>
            </span>{' '}
            Products
          </li>
          <li
            className={activeMenu === 'Upload' ? 'active' : ''}
            onClick={() => handleMenuClick('Upload')}
          >
            <span className="icon">
              <i className="bi bi-upload"></i>
            </span>{' '}
            Upload
          </li>
        </ul>
        <button className="sign-out-button" onClick={handleSignOut}>
          <i className="bi bi-box-arrow-right"></i> Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>{activeMenu}</h1>
        {activeMenu === 'Dashboard' && (
          <div>
            <p>Welcome to the Dashboard!</p>
          </div>
        )}
        {activeMenu === 'Products' && (
          <div>
            <p>List of products</p>
          </div>
        )}
        {activeMenu === 'Upload' && (
          <div>
            <p>Upload your files here:</p>
            <input type="file" onChange={handleFileChange} />
            
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
