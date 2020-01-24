import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { getUserDetailsAction } from './actions';
import './App.css';
import { AddVacation } from './Components/AddVacation/AddVacation';
import { Login } from './Components/Login/Login';
import { NavBar } from './Components/NavBar/NavBar';
import { Register } from './Components/Register/Register';
import { VacationPage } from './Components/VacationPage/VacationPage';
import { IState } from './reducer';

// export default class NavBar extends React.Component<INavBarProps, INavBarState> {
export interface IAppProps {
  getUser(): void ,
}

class _App extends React.Component<IAppProps> {

  componentDidMount() {
    const {getUser} = this.props
    const token = localStorage.getItem('token');
    if (token) {
      getUser()
    } 
  }

  public render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/" exact>
            <div>homepage</div>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/vacations">
            <VacationPage />
          </Route>
          <Route>
            <AddVacation />
          </Route>
          <Route>
            page not found
        </Route>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => {
  return {

  }
}
const mapDispatchToProps = {
  getUser : getUserDetailsAction
}

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(_App)