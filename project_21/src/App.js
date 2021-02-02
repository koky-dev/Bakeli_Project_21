import './App.css';
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
