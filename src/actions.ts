import { Dispatch } from 'redux';
import { IAction, ActionType } from './reducer';
import { setToken } from '.';
import { ApiClient } from './apiClient';

export const getUserDetailsAction = () => {
    return async (dispatch: Dispatch<IAction>) => {
        const { data } = await ApiClient.get().get('http://localhost:5000/users/me');
        dispatch({
            type: ActionType.LoginSuccess,
            payload: data
        })
    }
}

export const followAction = (vacationId: number) => {
    return async (dispatch: Dispatch<IAction>) => {
        await ApiClient.get().post(`http://localhost:5000/vacations/${vacationId}/follow`);
        dispatch({
            type: ActionType.Follow,
            payload: vacationId
        })
    }
}

export const unFollowAction = (vacationId: number) => {
    return async (dispatch: Dispatch<IAction>) => {
        await ApiClient.get().post(`http://localhost:5000/vacations/${vacationId}/unfollow`);
        dispatch({
            type: ActionType.UnFollow,
            payload: vacationId
        })
    }
}

export const addVacationAction = (description: string, destination: string, image: string,
    startDate: string, endDate: string, price: number) => {
    return async (dispatch: Dispatch<IAction>) => {
        await ApiClient.get().post('http://localhost:5000/vacations', {
            description, destination, image, startDate, endDate, price
        })
        dispatch({
            type: ActionType.AddVacation,
            payload: {}
        })
    }
}

export const registerAction = (firstName: string, lastName: string, password: string, userName: string) => {
    return async (dispatch: Dispatch<IAction>) => {
        const response = await ApiClient.get().post('http://localhost:5000/auth/register', {
            firstName, lastName, password, userName
        });
        dispatch({
            type: ActionType.RegisterSuccess,
            payload: response.data
        });
        const { token } = response.data;

        setToken(token);
    }
}

export const logInAction = (userName: string, password: string) => {


    return async (dispatch: Dispatch<IAction>) => {
        const { data } = await ApiClient.get().post('http://localhost:5000/auth/login', { userName, password });
        const { token } = data
        setToken(token);
        dispatch({
            type: ActionType.LoginSuccess,
            payload: data
        });

    }
}

export const getMyVacationsAction = () => {
    return async (dispatch: Dispatch<IAction>) => {
        dispatch({
            type: ActionType.GetVacationsPending,
            payload: {}
        });
        const { data } = await ApiClient.get().get('http://localhost:5000/vacations/me');

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