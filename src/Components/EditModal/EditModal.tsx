import * as React from 'react';
import { IState } from '../../reducer';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"
import { connect } from 'react-redux';
import { closeEditAction, IEditableVacationFields, editVacationAction, getMyVacationsAction } from '../../actions';
import { IVacation } from '../../Models/vacation.model';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import moment from 'moment';

export interface IEditModalProps {
    shouldShowModal?: boolean;
    vacation: IVacation;
    closeEdit?(): void,
    editVacation?(id: number, fields: IEditableVacationFields): void,
    getVacation():void,
}

class _EditModal extends React.Component<IEditModalProps, IEditableVacationFields> {
    state: IEditableVacationFields = {
        destination: null,
        description: null,
        startDate: null,
        endDate: null,
        image: null,
        price: null,
    }

    componentWillReceiveProps(nextProps: IEditModalProps) {
       
        if (nextProps.vacation && this.props.vacation !== nextProps.vacation) {
            this.setState({
                description: nextProps.vacation.description,
                destination: nextProps.vacation.destination,
                image: nextProps.vacation.image,
                startDate: nextProps.vacation.startDate,
                endDate: nextProps.vacation.endDate,
                price: nextProps.vacation.price,
            })
        }
       
    }

    public render() {
        const { shouldShowModal, closeEdit } = this.props;
        const { description, destination, image, startDate, endDate, price } = this.state;
        if (!shouldShowModal) {
            return null;
        }
        return (
            <Modal show onHide={closeEdit} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Vacation</Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.onSubmit}>
                    <Modal.Body>
                        <Form.Control required onChange={this.onChangeDescription} value={description} placeholder="description" />
                        <Row className="row">
                            <Col>
                                <Form.Control required onChange={this.onChangeDestination} value={destination} placeholder="destination" />
                            </Col>
                            <Col>
                                <Form.Control required onChange={this.onChangeImage} value={image} placeholder="image(enter URL)" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Control required onChange={this.onChangeStartDate} value={moment(startDate).format('YYYY-MM-DD')} type="date" placeholder="Start Date" />
                            </Col>
                            <Col>
                                <Form.Control required onChange={this.onChangeEndDate} value={moment(endDate).format('YYYY-MM-DD')} type="date" placeholder="End Date" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl type="number" required onChange={this.onChangePrice} value={price ? price.toString() : ''} aria-label="Amount (to the nearest dollar)" placeholder="price" />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={closeEdit} variant="secondary">
                            Close
                     </Button>
                        <Button type="submit" variant="primary">
                            Save Changes
                    </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }

    generateOnChangeHandler = (fieldName: keyof IEditableVacationFields) => {

        return (e: React.ChangeEvent<HTMLInputElement>): void => {
            const { value } = e.target;
            this.setState({
                [fieldName]: value
            } as any)
        }
    }
    onChangeDescription = this.generateOnChangeHandler('description');
    onChangeDestination = this.generateOnChangeHandler('destination');
    onChangeImage = this.generateOnChangeHandler('image');
    onChangeStartDate = this.generateOnChangeHandler('startDate');
    onChangeEndDate = this.generateOnChangeHandler('endDate');
    onChangePrice = this.generateOnChangeHandler('price');

    onSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        const { editVacation, closeEdit } = this.props;
        const { id } = this.props.vacation

        editVacation(id, this.state);
        
        closeEdit();
    }
}


const mapStateToProps = (state: IState) => {
    return {
        shouldShowModal: state.vacationInEditId !== null,
        vacation: state.vacations.find(vacation => vacation.id === state.vacationInEditId),
    }
}

const mapDispatchToProps = {
    closeEdit: closeEditAction,
    editVacation: editVacationAction,
    getVacation:getMyVacationsAction
}

export const EditModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(_EditModal)
