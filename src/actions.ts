import { Dispatch } from 'redux';
import axios from 'axios';
import { IAction, ActionType } from './reducer';
import { setToken } from '.';

export const followAction = (vacationId: number) => {
    return async (dispatch: Dispatch<IAction>) => {
        await axios.post(`http://localhost:5000/vacations/${vacationId}/follow`);
        dispatch({
            type: ActionType.Follow,
            payload: vacationId
        })
    }
}

export const unFollowAction = (vacationId: number) => {
    return async (dispatch: Dispatch<IAction>) => {
        await axios.post(`http://localhost:5000/vacations/${vacationId}/unfollow`);
        dispatch({
            type: ActionType.UnFollow,
            payload: vacationId
        })
    }
}


export const registerAction = (firstName: string, lastName: string, password: string, userName: string) => {
    return async (dispatch: Dispatch<IAction>) => {
        const response = await axios.post('http://localhost:5000/auth/register', {
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

export const logInAction = (userName: string, password: string) => {
    return async (dispatch: Dispatch<IAction>) => {
        const { data } = await axios.post('http://localhost:5000/auth/login', { userName, password });
        dispatch({
            type: ActionType.LoginSuccess,
            payload: {}
        });
        const { token } = data
        setToken(token);
    }
}

export const getMyVacationsAction = () => {
    return async (dispatch: Dispatch<IAction>) => {
        dispatch({
            type: ActionType.GetVacationsPending,
            payload: {}
        });
        const { data } = await axios.get('http://localhost:5000/vacations/me');
        dispatch({
            type: ActionType.GetVacationsSuccess,
            payload: data,
        })
    }
}


export const logOutAction = (): IAction => {
    localStorage.removeItem('token');
    return {
        type: ActionType.LogOut,
        payload: {}
    }
}