import React from 'react'
import './index.css' // Import the CSS file for NotFound

const NotFound = () => (
  <div className="not-found-container">
    <div className="not-found">
      <img
        className="not-found-img"
        src="https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png"
        alt="not found"
      />
      <h1 className="not-found-heading">Page not Found</h1>
      <p className="not-found-message">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound
