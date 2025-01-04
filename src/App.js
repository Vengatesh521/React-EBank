import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/ebank/login" component={Login} />
      <Route path="/bad-path" component={NotFound} />
      <Redirect to="/bad-path" />
    </Switch>
  </div>
)

export default App
