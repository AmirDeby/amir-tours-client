import moment from 'moment';
import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import { IVacation } from '../../Models/vacation.model';
import "./EditVacation.css";
import { deletaVacationAction } from '../../actions';

export interface IEditVacationProps {
    vacation: IVacation,
    deleteVacation?(id: number): void,
}

class _EditVacation extends React.Component<IEditVacationProps> {
    public render() {
        const { description, destination, endDate, image, startDate } = this.props.vacation;
        return (
            <div>
                <Card className="edit-vacation">
                    <Card.Img variant="top" src={image} className="img-size" />
                    <Card.Body>
                        <Card.Title>{destination}</Card.Title>
                        <Card.Text className="description-div">
                            {description}
                        </Card.Text>
                        <Card.Text>
                            {moment(startDate).format('DD-MM-YYYY')} -- {moment(endDate).format('DD-MM-YYYY')}
                        </Card.Text>
                        <Card.Text>
                            <Button variant="outline-primary">Edit</Button>
                        </Card.Text>
                        <Button type="button" onClick={this.onDeleteHandler} variant="outline-danger">Delete</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    onDeleteHandler = () => {
        const { id } = this.props.vacation;
        const {deleteVacation} = this.props;
        
        deleteVacation(id)
        
    }
}


const mapDispatchToProps = {
    deleteVacation: deletaVacationAction
}

export const EditVacation = connect(
    undefined,
    mapDispatchToProps
)(_EditVacation)