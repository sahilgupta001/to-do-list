import './App.css';
import Header from './components/header'
import Dashboard from './components/dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Description from './components/description';
import Auth from './components/auth'
import RegisterUser from './components/register';

export default function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route exact path = '/' element = {<Auth />}></Route>  
          <Route exact path = '/home' element = {<Dashboard />}></Route>  
          <Route exact path = '/register' element = {<RegisterUser />}></Route>  
          <Route exact path = '/item/:currentItemInView' element = {<Description />}></Route>  
        </Routes>
      </Router>
    </div>
  );
}
