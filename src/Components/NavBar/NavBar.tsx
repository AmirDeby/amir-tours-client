import * as React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IState } from '../../reducer';
import { LogOutButton } from '../LogOutButton/LogOutButton';
import "./NavBar.css";

export interface INavBarProps {

    userName?: string;
    isAdmin: number;
    isLogged: boolean
}

class _NavBar extends React.Component<INavBarProps> {

    public render() {
        const { userName, isAdmin, isLogged } = this.props
        return (
            <div>
                <Navbar className="back-color" >
                    <Navbar.Brand>Amir's Tours</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Item className="link-mr"><Link to="/">Home</Link></Nav.Item>
                            <Nav.Item className="link-mr"><Link to='/vacations'>Vacations</Link></Nav.Item>
                            {isAdmin ? <Nav.Item className="link-mr"><Link to='/addVacation'>AddVacation</Link></Nav.Item> : null}
                            {isAdmin ? <Link className="link-mr" to='/followbar'>Followers Status</Link> : null}
                        </Nav>
                        <span style={{ marginRight: "12px" }}>{userName}</span>
                        {isLogged ? null : <Link className="link-mr" to='/register'>Register</Link>}
                        {isLogged ? null : <Link className="link-mr" to='/login'>Login</Link>}
                        <LogOutButton />
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}


const mapStateToProps = (state: IState) => {
    let { userName, isAdmin } = state.userDetails;
    userName = userName ? `Hello  ${userName}` : "";
    return {
        userName,
        isAdmin,
        isLogged: state.isLogged
    }
}
const mapDispatchToProps = {

}

export const NavBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(_NavBar)
