import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Register from './Components/Register/Register';


const App: React.FC = () => {
  return (
    <div className="App">
     <NavBar />
      <Switch>
        <Route path="/" exact>
          <div>homepage</div>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route>
        
        </Route>
        <Route>
          page not found
        </Route>
      </Switch>
    </div>
  );
}

export default App;
