import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { Register } from './Components/Register/Register'
import { VacationPage } from './Components/VacationPage/VacationPage';
import { Login } from './Components/Login/Login';


const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <div>homepage</div>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/vacations">
          <VacationPage />
        </Route>
        <Route>
          page not found
        </Route>
      </Switch>
    </div>
  )
}

export default App;
