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

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userID, userPin} = this.state
    const userDetails = {
      user_id: userID, // Use 'user_id' instead of 'userID'
      pin: userPin, // Use 'pin' instead of 'userPin'
    }
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json', // Ensure JSON content type is set
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userID, userPin, showPassword, showSubmitError, errorMsg} =
      this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="container">
        <div className="box">
          <div>
            <img
              className="img"
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <div className="login-container">
            <form className="login" onSubmit={this.submitForm}>
              <h1>Welcom Back!</h1>
              <label htmlFor="text">User ID</label>
              <input
                id="text"
                type="text"
                value={userID}
                onChange={this.onChangeUserId}
                placeholder="Enter User ID"
              />
              <label htmlFor="pin">PIN</label>
              <input
                id="pin"
                type={showPassword ? 'text' : 'password'}
                value={userPin}
                onChange={this.onChangePin}
                placeholder="Enter PIN"
              />
              <label>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={this.toggleShowPassword} // Call the toggle function
                />
                Show Password
              </label>
              <button type="submit">Login</button>
              {showSubmitError && (
                <p style={{fontWeight: 'normal'}}>*{errorMsg}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
