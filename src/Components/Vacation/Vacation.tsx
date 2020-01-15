import * as React from 'react';
import { IVacation } from '../../Models/vacation.model';
import Card from 'react-bootstrap/Card'

export interface IVacationProps {
    // vacation: IVacation,
    id?: number,
    description: string,
    destination: string,
    image: string,
    startDate: Date,
    endDate: Date,
    price: number,
    isFollowed: boolean
}

export default class Vacation extends React.Component<IVacationProps> {
    public render() {
        // const { vacation } = this.props
        // const { image, destination, description, startDate, endDate, price, isFollowed} = vacation
        const { description, destination, endDate, image, isFollowed, price, startDate } = this.props
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={image} />
                    <Card.Body>
                        <Card.Title>{destination}</Card.Title>
                        <Card.Text>
                            {description}
                        </Card.Text>
                        <Card.Text>
                            {startDate}
                        </Card.Text>
                        <Card.Text>
                            {endDate}
                        </Card.Text>
                        <Card.Text>
                            {`$  ${price}`}
                        </Card.Text>
                        <Card.Text>
                            {isFollowed}
                        </Card.Text>

                    </Card.Body>
                </Card>
            </div>
        );
    }
}
