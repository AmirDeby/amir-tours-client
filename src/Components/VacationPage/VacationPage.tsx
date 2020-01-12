import * as React from 'react';
import { connect } from 'react-redux';
import { getMyVacationsAction } from '../../actions';
import { IState } from '../../reducer';
import { IVacation } from '../../Models/vacation.model';

export interface IVacationPageProps {
    getVacations(): void,
    vacations:IVacation[],
}

class _VacationPage extends React.Component<IVacationPageProps> {

    componentDidMount() {
        const { getVacations } = this.props;
        getVacations();
    } 

    public render() {
        const { vacations } = this.props;
        console.log(vacations);
        
    return (
      <div>
        
      </div>
    );
  }
}
const mapStateToProps = (state:IState) => {
    return {
        vacations: state.vacations,
    }
} 

const mapDispatchToProps = {
    getVacations : getMyVacationsAction
}


export const VacationPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(_VacationPage)
