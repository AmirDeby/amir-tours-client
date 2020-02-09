import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { getUserDetailsAction } from './actions';
import './App.css';
import { EditModal } from './Components/EditModal/EditModal';
import { NavBar } from './Components/NavBar/NavBar';
import { IUserDetails } from './Models/userDetails.model';
import { AddVacation } from './Pages/AddVacation/AddVacation';
import { AdminVacationPage } from './Pages/AdminVacationPage/AdminVacationPage';
import { FollowBar } from './Pages/FollowBar/FollowBar';
import { Login } from './Pages/Login/Login';
import { Register } from './Pages/Register/Register';
import { VacationPage } from './Pages/VacationPage/VacationPage';
import { IState } from './reducer';

// export default class NavBar extends React.Component<INavBarProps, INavBarState> {
export interface IAppProps {
  getUser(): void,
  user: IUserDetails
}


class _App extends React.Component<IAppProps> {

  componentDidMount() {
    const { getUser } = this.props
    const token = localStorage.getItem('token');
    if (token) {
      getUser()
    }
  }

  public render() {
    const { isAdmin } = this.props.user

    return (
      <div className="App">
        <NavBar />
        <EditModal />
        <Switch>
          <Route path="/" exact>
            <div>
              <h1>
                <u>Welcome to Amir's Tours</u>
              </h1>
               <div className="title">
                <h4><Link to="/register">Register</Link> to see your next vacation</h4>
              </div>
              </div>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/vacations">
            {isAdmin ? <AdminVacationPage /> : <VacationPage />}
          </Route>
          <Route path="/followbar">
            <FollowBar />
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
    user: state.userDetails
  }
}
const mapDispatchToProps = {
  getUser: getUserDetailsAction
}

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(_App)