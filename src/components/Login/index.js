import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userID: '',
    userPin: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({userID: event.target.value})
  }

  onChangePin = event => {
    this.setState({userPin: event.target.value})
  }

  toggleShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30}) // Store JWT token in cookies
    history.replace('/') // Redirect to Home
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userID, userPin} = this.state

    if (userID.trim() === '') {
      this.onSubmitFailure('Invalid user ID')
      return
    }

    if (userPin.trim() === '') {
      this.onSubmitFailure('Invalid PIN')
      return
    }

    const userDetails = {user_id: userID, pin: userPin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        this.onSubmitSuccess(data.jwt_token)
      } else {
        this.onSubmitFailure(data.error_msg || 'User ID and PIN didn’t match')
      }
    } catch {
      this.onSubmitFailure('Network request failed. Please try again.')
    }
  }

  render() {
    const {
      userID,
      userPin,
      showPassword,
      showSubmitError,
      errorMsg,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page">
        <div className="login-box">
          <div className="login-image-container">
            <img
              className="login-image"
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <div className="login-form-container">
            <form className="login-form" onSubmit={this.submitForm}>
              <h1 className="login-heading">Welcome Back!</h1>
              <label htmlFor="userID" className="login-label">
                User ID
              </label>
              <input
                id="userID"
                type="text"
                className="login-input"
                value={userID}
                onChange={this.onChangeUserId}
                placeholder="Enter User ID"
              />

              <label htmlFor="userPin" className="login-label">
                PIN
              </label>
              <input
                id="userPin"
                type={showPassword ? 'text' : 'password'}
                className="login-input"
                value={userPin}
                onChange={this.onChangePin}
                placeholder="Enter PIN"
              />

              <div className="password-toggle-container">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={this.toggleShowPassword}
                />
                <label htmlFor="showPassword" className="password-toggle-label">
                  Show Password
                </label>
              </div>

              <button type="submit" className="login-button">
                Login
              </button>

              {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
