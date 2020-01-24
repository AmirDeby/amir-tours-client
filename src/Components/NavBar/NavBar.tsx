import * as React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IState } from '../../reducer';
import { LogOutButton } from '../LogOutButton/LogOutButton';

export interface INavBarProps {

    userName?: string;
    isAdmin: number;
}


class _NavBar extends React.Component<INavBarProps> {

    public render() {
        const { userName, isAdmin } = this.props
        return (
            <div>
                <Navbar style={{ backgroundColor: "#dae0e5ba" }} >
                    <Navbar.Brand>Amir's Tours</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Item><Link to="/">Home</Link></Nav.Item>
                            <Nav.Item><Link to='/vacations'>Vacations</Link></Nav.Item>
                            {isAdmin ? <Nav.Item><Link to='/addVacation'>AddVacation</Link></Nav.Item> : null}
                        </Nav>
                        <span style={{ marginRight: "7px" }}>{userName}</span>
                        <Link to='/register'>Register</Link>
                        <Link to='/login'>Login</Link>
                        <LogOutButton />
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }

    onSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        this.setState({
            search: value
        })
    }
}

const mapStateToProps = (state: IState) => {
    let { userName, isAdmin } = state.userDetails;
    userName = userName ? `Hello  ${userName}` : ""
    return {
        userName,
        isAdmin
    }
}
const mapDispatchToProps = {

}
export const NavBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(_NavBar)