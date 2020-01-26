import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { getMyVacationsAction } from '../../actions';
import { EditVacation } from '../../Components/EditVacation/EditVacation';
import { IVacation } from '../../Models/vacation.model';
import { IState } from '../../reducer';

export interface IAdminVacationPageProps {
    getVacations(): void,
    vacations: IVacation[],
    isLogged: boolean,
}

class _AdminVacationPage extends React.Component<IAdminVacationPageProps> {

    componentDidMount() {
        const { getVacations } = this.props;
        getVacations()
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
                        <EditVacation vacation={vacation} />
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
    getVacations: getMyVacationsAction,
    
}


export const AdminVacationPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(_AdminVacationPage)
