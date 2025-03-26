import React from 'react';
import { Link } from 'react-router-dom'; // Importer Link depuis react-router-dom
import './Notfound.css';
function NotFound() {
  return (
    <div className='container1'>
      <h2>page Not Found</h2>
      
      <Link to="/">Return Home</Link> {}
    </div>
  );
}

export default NotFound;
