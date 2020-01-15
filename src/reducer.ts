import { IVacation } from "./Models/vacation.model";

export interface IState {
    isLogged: boolean,
    vacations: IVacation[],
}

export interface IAction {
    type: ActionType;
    payload: any;

}


const initialState: IState = {
    isLogged: false,
    vacations: [],
};

export enum ActionType {
    RegisterSuccess = "REGISTER_SUCCESS",
    RegisterFail = "REGISTER_FAIL",
    LoginSuccess = "LOGIN_SUCCESS",
    LoginFail = "LOGIN_FAIL",
    GetVacationsPending = "GET_VACATIONS_PENDING",
    GetVacationsSuccess = "GET_VACATIONS_SUCCESS",
    LogOut ="LOG_OUT",

}

export const reducer = (state = initialState, action: IAction): IState => {
    switch (action.type) {

        case ActionType.LogOut: {
            return {
                ...state,
                isLogged:false
            }
        }

        case ActionType.GetVacationsPending: {
            return {
                ...state,
            }
        }
        case ActionType.GetVacationsSuccess: {
            return {
                ...state,
                vacations: action.payload
            }
        }

        case ActionType.RegisterSuccess: {
            return {
                ...state,
                isLogged: true
            }
        }
        case ActionType.LoginFail: {
            return {
                ...state,
                
            }
            }
        case ActionType.LoginSuccess: {
            return {
                ...state,
                isLogged: true
            }
        }
        default: {
            return state;
        }
    }
}