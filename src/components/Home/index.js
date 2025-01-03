import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css' // Import the CSS file for Home

const Home = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="home-container">
      <nav className="home-nav">
        <img
          className="home-logo"
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </nav>
      <div className="home-content">
        <img
          className="digital-card-img"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )
}
export default withRouter(Home)
