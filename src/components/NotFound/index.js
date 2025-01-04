import React from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const NotFound = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="'/ebank/login" />
  }
  return (
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
}

export default NotFound
