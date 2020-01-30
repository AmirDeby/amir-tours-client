import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { connect } from 'react-redux';
import { IState } from '../../reducer';
import { IVacation } from '../../Models/vacation.model';
import { Redirect } from 'react-router';

export interface IFollowBarProps {
    vacations: IVacation[],
    isLogged:boolean,
}

const colors = scaleOrdinal(schemeCategory10).range();

const data = [
    {
        destination: 'London', uv: 4000, followers: 10, male: 10,
    },
    {
        destination: 'Tbilisi', uv: 3000, followers: 5, male: 5,
    },
    {
        destination: 'Paris', uv: 3000, followers: 7, male: 7,
    },
    {
        destination: 'Budapest', uv: 3000, followers: 9, male: 9,
    },
    {
        destination: 'Berlin', uv: 3000, followers: 2, male: 2,
    },
    {
        destination: 'Rome', uv: 2000, followers: 17, male: 17,
    }
];

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

    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/rnywhbu8/';

    render() {
        const { vacations, isLogged } = this.props;
        if (!isLogged) {
            return <Redirect to="login"/>
        }
        return (
            <BarChart style={{ margin: " 10px auto" }}
                width={850}
                height={370}
                data={vacations}
                margin={{
                    top: 30, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="destination" />
                <YAxis />
                <Bar dataKey="numOfFollowers" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                    {
                        data.map((entry, index) => (
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
        isLogged:state.isLogged
    }
}
const mapDispatchToProps = {

}

export const FollowBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(_FollowBar)