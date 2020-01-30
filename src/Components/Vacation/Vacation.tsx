import moment from 'moment';
import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import { followAction, unFollowAction } from '../../actions';
import { IVacation } from '../../Models/vacation.model';
import "./vacation.css";

export interface IVacationProps {
    vacation: IVacation,
    follow?(vacationId: number): void,
    unFollow?(vacationId: number): void,

}

class _Vacation extends React.Component<IVacationProps> {
    public render() {
        const { description, destination, endDate, image, isFollowed, price, startDate, numOfFollowers } = this.props.vacation;
        
        return (
            <div>
                <Card className="main-div">
                    <Card.Img variant="top" src={image} className="img-size" />
                    <Card.Body>
                        <Card.Title>{destination}</Card.Title>
                        <Card.Text className="description-div">
                            {description}
                        </Card.Text>
                        <Card.Text>
                            {moment(startDate).format('DD-MM-YYYY')}
                        </Card.Text>
                        <Card.Text>
                            {moment(endDate).format('DD-MM-YYYY')}
                        </Card.Text>
                        <Card.Text>
                            <Button variant="outline-success"> {`Order $ ${price}`}</Button>
                        </Card.Text>
                        <Card.Text>
                            <Button variant="outline-dark" type="button" onClick={this.onClickHandler}>
                                {isFollowed ? 'followed' : 'not followed'}
                            </Button>
                        </Card.Text>
                        <p className="heart followers" ><div className="follower">{numOfFollowers}</div></p>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    onClickHandler = () => {
        const { isFollowed, id } = this.props.vacation;
        const { unFollow, follow } = this.props;

        if (!isFollowed) {
            follow(id)
        } else {
            unFollow(id)
        }
    }
}

const mapDispatchToProps = {
    follow: followAction,
    unFollow: unFollowAction
}

export const Vacation = connect(
    undefined,
    mapDispatchToProps
)(_Vacation)