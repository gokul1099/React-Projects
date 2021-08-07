import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./Screens/Home"
import DashBoard from "./Screens/DashBoard"
import Login from "./Screens/Login"
import Profile from "./Screens/Profile"
import PatientProfile from './Screens/PatientProfileScreen';



import NavBar from './Components/NavBar'

function App() {

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path="/user/dashboard" component={DashBoard} />
        <Route path="/user/profile" component={Profile} />
        <Route path="/patientprofile" component={PatientProfile} />
      </Switch>
    </Router>
  );
}

export default App;
