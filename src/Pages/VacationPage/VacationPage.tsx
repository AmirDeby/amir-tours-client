import * as React from 'react';
import { connect } from 'react-redux';
import { getMyVacationsAction } from '../../actions';
import { IState } from '../../reducer';
import { IVacation } from '../../Models/vacation.model';
import { Vacation } from '../../Components/Vacation/Vacation';
import { Redirect } from 'react-router';

export interface IVacationPageProps {
    getVacations(): void,
    vacations: IVacation[],
    isLogged: boolean,
}

class _VacationPage extends React.Component<IVacationPageProps> {

    componentDidMount() {
        const { getVacations } = this.props;
        getVacations();
    }

    public render() {
        const { vacations, isLogged } = this.props;
        if (!isLogged) {
            return <Redirect to="/login" />
        }
        return (
            <div style={{ margin: "13px" }} className="row">
                {vacations.map((vacation) =>
                    <div key={vacation.id} className="col-8 col-md-4">
                        <Vacation vacation={vacation} />
                    </div>)}
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => {
    return {
        vacations: state.vacations,
        isLogged: state.isLogged
    }
}

const mapDispatchToProps = {
    getVacations: getMyVacationsAction
}


export const VacationPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(_VacationPage)
