import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import { addVacationAction } from '../../actions';
import { IState } from '../../reducer';
import "./AddVacation.css";


export interface IAddVacationProps {
    
    addVacation(description: string, destination: string, image: string, startDate: string, endDate: string, price: number): void,
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
        const { addVacation } = this.props
        e.preventDefault()

        addVacation(description, destination, image, startDate, endDate, price)

    }
}

const mapStateToProps = (state: IState) => {
    return {
       
    }
}

const mapDispatchToProps = {
    addVacation: addVacationAction
}

export const AddVacation = connect(
    mapStateToProps,
    mapDispatchToProps
)(_AddVacation) 