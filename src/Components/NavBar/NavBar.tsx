import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from 'react-router-dom';

export interface INavBarProps {

}

interface INavBarState {
    search: string;
}

export default class NavBar extends React.Component<INavBarProps, INavBarState> {
    state: INavBarState = {
        search:"",
    }
    public render() {
    return (
      <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Amir's Tours</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link>Vacations</Nav.Link>
                        <NavDropdown title="User Pages" id="basic-nav-dropdown">
                            <NavDropdown.Item><Link to='/register'>Register</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to='/login'>Login</Link></NavDropdown.Item>
                            
                            <NavDropdown.Divider />

                        </NavDropdown>
                    </Nav>
                    <Form onSubmit={this.onSearchSubmit} inline>
                        <FormControl onChange={this.onSearchChange} value={this.state.search} type="text" placeholder="Search" className="mr-sm-2" />
                        <Button type="submit" variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
      </div>
    );
    }
    
    onSearchSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const {search} = this.state
        console.log(search);
        
    }

    onSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        this.setState({
            search : value 
        })
    }
}
