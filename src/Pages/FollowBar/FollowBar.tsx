import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { connect } from 'react-redux';
import { IState } from '../../reducer';
import { IVacation } from '../../Models/vacation.model';
import { Redirect } from 'react-router';
import { getMyVacationsAction } from '../../actions';
import { Vacation } from '../../Components/Vacation/Vacation';

export interface IFollowBarProps {
    vacations: IVacation[],
    isLogged: boolean,
    getVacations(): void,
}

const colors = scaleOrdinal(schemeCategory10).range();

const getPath = (x: any, y: any, width: any, height: any) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props: any) => {
    const {
        fill, x, y, width, height,
    } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

TriangleBar.propTypes = {
    fill: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
};

class _FollowBar extends PureComponent<IFollowBarProps> {

    componentDidMount() {
        const { getVacations, vacations } = this.props;
        if (!vacations.length) {
            getVacations()
        }
    }

    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/rnywhbu8/';

    render() {
        const { vacations, isLogged} = this.props;
        if (!isLogged) {
            return <Redirect to="login" />
        }
        const vacationWithFollowers = vacations.filter(vacation => vacation.numOfFollowers)
        return (
            <BarChart style={{ margin: " 10px auto" }}
                width={850}
                height={370}
                data={vacationWithFollowers}
                margin={{
                    top: 30, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="destination" />
                <YAxis />
                <Bar dataKey="numOfFollowers" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                    {
                        vacationWithFollowers.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                        ))
                    }
                </Bar>
            </BarChart>
        );
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

export const FollowBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(_FollowBar)