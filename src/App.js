import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Description from './components/description';
import Auth from './components/auth'
import RegisterUserComponent from './components/register';
import DashboardComponent from './components/dashboard';
import UserProfileComponent from './components/userProfile';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path = '/' element = {<Auth />}></Route>
          <Route exact path = '/register' element = {<RegisterUserComponent />}></Route>  
          {localStorage.getItem('token') &&   
            <>
              <Route exact path = '/home' element = {<DashboardComponent />}></Route>  
              <Route exact path = '/item/:currentItemInView' element = {<Description />}></Route>  
              <Route exact path = '/profile' element = {<UserProfileComponent />}></Route>  
            </>
          }
          </Routes>
      </Router>
    </div>
  );
}
