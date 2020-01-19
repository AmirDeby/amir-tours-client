import * as React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "./AddVacation.css";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { IState } from '../../reducer';
import { getUsersAction } from '../../actions';
import { IUsers } from '../../Models/users.model';
import { userInfo } from 'os';


export interface IAddVacationProps {
    // getUsers(): void,
    // users?:IUsers[],
}

interface IAddVacationState {

    description: string,
    destination: string,
    image: string,
    startDate: string,
    endDate: string,
    price: number,

}

class _AddVacation extends React.Component<IAddVacationProps, IAddVacationState> {


    state: IAddVacationState = {
        description: "",
        destination: "",
        image: "",
        startDate: "",
        endDate: "",
        price: 0,
    }

    componentDidMount() {
        // const { getUsers } = this.props
        // getUsers()
    }

    public render() {
                
        return (
            <div className="container row">

                <Form onSubmit={this.onSubmit} className="form-div">
                    <h1><u>Add Vacations</u></h1>
                    <Form.Control onChange={this.generareOnChangeHandler('description')} name="description" placeholder="description" />
                    <Row className="row">
                        <Col>
                            <Form.Control onChange={this.generareOnChangeHandler('destination')} name="destination" placeholder="destination" />
                        </Col>
                        <Col>
                            <Form.Control onChange={this.generareOnChangeHandler('image')} name="image" placeholder="image(enter URL)" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control onChange={this.generareOnChangeHandler('startDate')} name="startDate" type="date" placeholder="Start Date" />
                        </Col>
                        <Col>
                            <Form.Control onChange={this.generareOnChangeHandler('endDate')} name="endDate" type="date" placeholder="End Date" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl onChange={this.generareOnChangeHandler('price')} name="price" aria-label="Amount (to the nearest dollar)" placeholder="price" />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Button type="submit">Add Vacation</Button>
                </Form>
            </div>
        );
    }
    generareOnChangeHandler = (fieldName: keyof IAddVacationState) => {
        return (e: React.ChangeEvent<HTMLInputElement>): void => {
            const { value } = e.target;
            this.setState({
                [fieldName]: value
            } as any)
        }
    }
    onSubmit = async (e: React.FormEvent) => {
        const { description, destination, image, startDate, endDate, price } = this.state;

        e.preventDefault()
        

    }
}

const mapStateToProps = (state: IState) => {
    return {
        // users:state.users
    }
}

const mapDispatchToProps = {
    // getUsers: getUsersAction
}

export const AddVacation = connect(
    mapStateToProps,
    mapDispatchToProps
)(_AddVacation) 