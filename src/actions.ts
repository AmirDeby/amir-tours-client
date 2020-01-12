import { Dispatch } from 'redux';
import axios from 'axios';
import { IAction, ActionType } from './reducer';
import { setToken } from '.';




export const registerAction = (firstName: string, lastName: string, password: string, userName: string) => {
    return async (dispatch: Dispatch<IAction>) => {
        const response = await axios.post('http://localhost:5000/register', {
            firstName, lastName, password, userName
        });
        dispatch({
            type: ActionType.RegisterSuccess,
            payload: {}
        });
        const { token } = response.data;
        setToken(token);
    }
}

export const getMyVacationsAction = () => {
    return async (dispatch: Dispatch<IAction>) => {
        dispatch({
            type: ActionType.GetVacationsPending,
            payload: {}
        });
        const { data } = await axios.get('http://localhost:5000/vacations/me?userId=9');
        dispatch({
            type: ActionType.GetVacationsSuccess,
            payload: data,
        })
    }
}