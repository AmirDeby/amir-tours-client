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
    addVacationSuccess: boolean,
    addVacation(description: string, destination: string, image: string, startDate: string, endDate: string, price: number): Promise<boolean>,
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

    initialState: IAddVacationState = {
        description: "",
        destination: "",
        image: "",
        startDate: "",
        endDate: "",
        price: null,

    }

    state = this.initialState;


    public render() {
        const { addVacationSuccess } = this.props;
        const { description, destination, endDate, image, price, startDate } = this.state;
        const isEnabled = this.canBeSubmitted()
        return (
            <div className="container row">

                <Form onSubmit={this.onSubmit} className="form-div">
                    <h1><u>Add Vacations</u></h1>
                    <Form.Control required onChange={this.onChangeDescription} value={description} name="description" placeholder="description" />
                    <Row className="row">
                        <Col>
                            <Form.Control required onChange={this.onChangeDestination} value={destination} name="destination" placeholder="destination" />
                        </Col>
                        <Col>
                            <Form.Control required onChange={this.generateOnChangeHandler('image')} value={image} name="image" placeholder="image(enter URL)" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control required onChange={this.generateOnChangeHandler('startDate')} value={startDate} name="startDate" type="date" placeholder="Start Date" />
                        </Col>
                        <Col>
                            <Form.Control required onChange={this.onChangeEndDate} value={endDate} name="endDate" type="date" placeholder="End Date" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type="number" required onChange={this.generateOnChangeHandler('price')} value={price ? price.toString() : ''} name="price" aria-label="Amount (to the nearest dollar)" placeholder="price" />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Button disabled={!isEnabled} type="submit">Add Vacation</Button>
                    {addVacationSuccess
                        ?
                        <div className="success-div">
                            <h2>Vacation Added successfully</h2>
                        </div>
                        :
                        null
                    }
                </Form>
            </div>
        );
    }

    generateOnChangeHandler = (fieldName: keyof IAddVacationState) => {
        return (e: React.ChangeEvent<HTMLInputElement>): void => {
            const { value } = e.target;
            this.setState({
                [fieldName]: value
            } as any)
        }
    }

    onChangeDescription = this.generateOnChangeHandler('description');
    onChangeDestination = this.generateOnChangeHandler('destination');
    onChangeEndDate = this.generateOnChangeHandler('endDate');

    onSubmit = async (e: React.FormEvent) => {
        const { description, destination, image, startDate, endDate, price } = this.state;
        const { addVacation } = this.props
        e.preventDefault()

        const result = await addVacation(description, destination, image, startDate, endDate, price);

        if (result) {
            this.setState(
                this.initialState
            )
        }

    }

    canBeSubmitted() {
        const { price, destination, image, description } = this.state;
        return (
            price > 0 &&
            destination.length > 0 &&
            image.length > 0 &&
            description.length > 0
        );
    }

}

const mapStateToProps = (state: IState) => {
    return {
        addVacationSuccess: state.addVacationSuccess
    }
}

const mapDispatchToProps = {
    addVacation: addVacationAction
}

export const AddVacation = connect(
    mapStateToProps,
    mapDispatchToProps
)(_AddVacation) 