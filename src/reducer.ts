import { IVacation } from "./Models/vacation.model";
import { IUsers } from "./Models/users.model";

export interface IState {
    isLogged: boolean,
    vacations: IVacation[],
    users:IUsers[],
}

export interface IAction {
    type: ActionType;
    payload: any;

}


const initialState: IState = {
    isLogged: false,
    vacations: [],
    users:[]
};

export enum ActionType {
    RegisterSuccess = "REGISTER_SUCCESS",
    RegisterFail = "REGISTER_FAIL",
    LoginSuccess = "LOGIN_SUCCESS",
    LoginFail = "LOGIN_FAIL",
    GetVacationsPending = "GET_VACATIONS_PENDING",
    GetVacationsSuccess = "GET_VACATIONS_SUCCESS",
    LogOut ="LOG_OUT",
    Follow = "FOLLOW",
    UnFollow = "UNFOLLOW",
    GetUsers = "GET_USERS",
}

export const reducer = (state = initialState, action: IAction): IState => {
    switch (action.type) {

        case ActionType.GetUsers: {
            return {
                ...state,
                users: action.payload
            }
        }

        case ActionType.UnFollow: {
            
            const vacationId = action.payload;
            const updatedVacations = state.vacations.concat();
            const vacationIndex = updatedVacations.findIndex(vacation => vacation.id === vacationId);
            updatedVacations[vacationIndex].isFollowed = false;

            return {
                ...state,
                vacations:updatedVacations,
            }
        }

        case ActionType.Follow: {

            const vacationId = action.payload;
            const updatedVacations = state.vacations.concat();
            const vacationIndex = updatedVacations.findIndex(vacation => vacation.id === vacationId);
            updatedVacations[vacationIndex].isFollowed = true;

            return {
                ...state,
                vacations: updatedVacations,
            }
        }

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