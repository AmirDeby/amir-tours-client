import { Dispatch } from 'redux';
import { IAction, ActionType } from './reducer';
import { setToken } from '.';
import { ApiClient } from './apiClient';
import { IVacation } from './Models/vacation.model';

export type IEditableVacationFields = Pick<IVacation, 'description' | 'destination' | 'endDate' | 'image' | 'price' | 'startDate'>;

export const resetVacationAction = () => {
    return {
        type: ActionType.ResetVacationSuccess,
        payload: {}
    }
}
export const resetErrorMessageAction = () => {
    return {
        type: ActionType.ResetErrorMessage,
        payload: {}
    }
}
export const editVacationAction = (id: number, fields: IEditableVacationFields) => {
    return async (dispatch: Dispatch<IAction>) => {
        try {
            await ApiClient.get().put(`http://localhost:5000/vacations/${id}`, fields);
            dispatch({
                type: ActionType.EditVacationSuccess,
                payload: {
                    fields,
                    id,
                }
            })
        }
        catch (e) {
            dispatch({
                type: ActionType.EditVacationFail,
                payload: e.message
            })
        }
    }
}
export const closeEditAction = () => {
    return {
        type: ActionType.CloseEdit,
        payload: {}
    }
}
export const openEditAction = (id: number) => {
    return {
        type: ActionType.OpenEdit,
        payload: id
    }
}
export const getUserDetailsAction = () => {
    return async (dispatch: Dispatch<IAction>) => {
        try {
            const { data } = await ApiClient.get().get('http://localhost:5000/users/me');
            dispatch({
                type: ActionType.LoginSuccess,
                payload: data
            })
        }
        catch (e) {
            dispatch({
                type: ActionType.LoginFail,
                payload: e.message
            })
        }
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
        try {
            await ApiClient.get().post('http://localhost:5000/vacations', {
                description, destination, image, startDate, endDate, price
            })
            dispatch({
                type: ActionType.AddVacation,
                payload: {}
            })
            return true
        }
        catch (e) {
            dispatch({
                type: ActionType.AddVacationFail,
                payload: e.message
            })
        }
    }
}
export const deletaVacationAction = (id: number) => {
    return async (dispatch: Dispatch<IAction>) => {
        await ApiClient.get().delete(`http://localhost:5000/vacations/${id}`);
        dispatch({
            type: ActionType.DeleteVacation,
            payload: { id }
        })
    }
}
export const registerAction = (firstName: string, lastName: string, password: string, userName: string) => {
    return async (dispatch: Dispatch<IAction>) => {
        try {
            const response = await ApiClient.get().post('http://localhost:5000/auth/register', {
                firstName, lastName, password, userName
            });
            const { token } = response.data;
            setToken(token);
            dispatch({
                type: ActionType.RegisterSuccess,
                payload: response.data
            });
        }
        catch (e) {
            dispatch({
                type: ActionType.RegisterFail,
                payload: e.message
            })
        }
    }
}
export const logInAction = (userName: string, password: string) => {

    return async (dispatch: Dispatch<IAction>) => {
        try {
            const { data } = await ApiClient.get().post('http://localhost:5000/auth/login', { userName, password });
            const { token } = data
            setToken(token);
            dispatch({
                type: ActionType.LoginSuccess,
                payload: data
            });
        }
        catch (e) {
            dispatch({
                type: ActionType.LoginFail,
                payload: e.message
            })
        }
    }
}

export const getMyVacationsAction = () => {
    return async (dispatch: Dispatch<IAction>) => {
        dispatch({
            type: ActionType.GetVacationsPending,
            payload: {}
        });
        const { data: vacations } = await ApiClient.get().get('http://localhost:5000/vacations/me');
        vacations.sort(sortByIsFollowed);
        dispatch({
            type: ActionType.GetVacationsSuccess,
            payload: vacations,
        });

    }
}
export const logOutAction = (): IAction => {
    localStorage.removeItem('token');
    return {
        type: ActionType.LogOut,
        payload: {}
    }
}
function sortByIsFollowed(v1: IVacation, v2: IVacation) {
    if (v1.isFollowed && !v2.isFollowed) {
        return -1;
    }
    if (v2.isFollowed && !v1.isFollowed) {
        return 1;
    }
    if (v1.description < v2.description) {
        return -1;
    }
    if (v2.description < v1.description) {
        return -1;
    }
    return 0;
}