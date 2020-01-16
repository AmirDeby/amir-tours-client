import * as React from 'react';
import { IVacation } from '../../Models/vacation.model';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { IState } from '../../reducer';
import { followAction, unFollowAction } from '../../actions';
import "./vacation.css"


export interface IVacationProps {
    vacation: IVacation,
    vacations: IVacation[],
    follow?(vacationId: number): void,
    unFollow?(vacationId: number): void,

}

class _Vacation extends React.Component<IVacationProps> {
    public render() {
        const { description, destination, endDate, image, isFollowed, price, startDate } = this.props.vacation;
        return (
            <div>
                <Card className="main-div">
                    <Card.Img variant="top" src={image} style={{width:"18rem", height:"200px"}} />
                    <Card.Body>
                        <Card.Title>{destination}</Card.Title>
                        <Card.Text className="description-div">
                            {description}
                        </Card.Text>
                        <Card.Text>
                            {startDate}
                        </Card.Text>
                        <Card.Text>
                            {endDate}
                        </Card.Text>
                        <Card.Text>
                            <Button variant="outline-success"> {`Oreder $ ${price}`}</Button>
                        </Card.Text>
                        <Card.Text>
                            <Button variant="outline-dark" type="button" onClick={this.onClickHandler} >{isFollowed ? 'followed' : 'not followed'}</Button>
                        </Card.Text>

                    </Card.Body>
                </Card>
            </div>
        );
    }

    onClickHandler = () => {
        const { isFollowed, id } = this.props.vacation;
        const { unFollow, follow } = this.props;
        console.log(isFollowed);
        console.log(id);


        if (!isFollowed) {
            follow(id)
        } else {
            unFollow(id)
        }
    }
}

const mapStateToProps = (state: IState) => ({
    vacations: state.vacations
})

const mapDispatchToProps = {
    follow: followAction,
    unFollow: unFollowAction
}

export const Vacation = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Vacation)