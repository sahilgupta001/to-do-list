import './App.css';
import Header from './components/header'
import Dashboard from './components/dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Description from './components/description';
import Auth from './components/auth'
import RegisterUser from './components/register';
import UserProfile from './components/userProfile';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path = '/' element = {<Auth />}></Route>
          <Route exact path = '/register' element = {<RegisterUser />}></Route>  
          {localStorage.getItem('token') &&   
            <>
              <Route exact path = '/home' element = {<Dashboard />}></Route>  
              <Route exact path = '/item/:currentItemInView' element = {<Description />}></Route>  
              <Route exact path = '/profile' element = {<UserProfile />}></Route>  
            </>
          }
          </Routes>
      </Router>
    </div>
  );
}
