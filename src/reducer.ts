import { IVacation } from "./Models/vacation.model";
import { IUserDetails } from "./Models/userDetails.model";
import { Vacation } from "./Components/Vacation/Vacation";

export interface IState {
    isLogged: boolean,
    addVacationSuccess: boolean,
    vacations: IVacation[],
    userDetails: IUserDetails,
}

export interface IAction {
    type: ActionType;
    payload: any;

}


const initialState: IState = {
    isLogged: false,
    addVacationSuccess: false,
    vacations: [],
    userDetails: { message: "", userName: "", isAdmin: 0, iat: null, userId: null }
};

export enum ActionType {
    RegisterSuccess = "REGISTER_SUCCESS",
    RegisterFail = "REGISTER_FAIL",
    LoginSuccess = "LOGIN_SUCCESS",
    LoginFail = "LOGIN_FAIL",
    GetVacationsPending = "GET_VACATIONS_PENDING",
    GetVacationsSuccess = "GET_VACATIONS_SUCCESS",
    LogOut = "LOG_OUT",
    Follow = "FOLLOW",
    UnFollow = "UNFOLLOW",
    AddVacation = "ADD_VACATION",
    AddVacationFail = "ADD_VACATION_FAIL",
    DeleteVacation = "DELETE_VACATION"


}

export const reducer = (state = initialState, action: IAction): IState => {
    switch (action.type) {

        case ActionType.AddVacationFail: {
            return {
                ...state,
            }
        }

        case ActionType.DeleteVacation: {

            const { id } = action.payload;
            const vacations = state.vacations.concat();
            const vacationIndex = vacations.findIndex(vacation => vacation.id === id);
            vacations.splice(vacationIndex, 1);
            return {
                ...state,
                vacations,
            }
        }

        case ActionType.AddVacation: {
            return {
                ...state,
                addVacationSuccess: true
            }
        }
        case ActionType.UnFollow: {

            const vacationId = action.payload;
            const updatedVacations = state.vacations.concat();
            const vacationIndex = updatedVacations.findIndex(vacation => vacation.id === vacationId);
            const currentVacation = updatedVacations[vacationIndex];
            updatedVacations[vacationIndex] = {
                ...currentVacation,
                isFollowed: false,
                numOfFollowers: currentVacation.numOfFollowers - 1
            };

            return {
                ...state,
                vacations: updatedVacations,
            }
        }

        case ActionType.Follow: {

            const vacationId = action.payload;
            const updatedVacations = state.vacations.concat();
            const vacationIndex = updatedVacations.findIndex(vacation => vacation.id === vacationId);
            const currentVacation = updatedVacations[vacationIndex];
            updatedVacations[vacationIndex] = {
                ...currentVacation,
                isFollowed: true,
                numOfFollowers: currentVacation.numOfFollowers + 1
            };
            return {
                ...state,
                vacations: updatedVacations,
            }
        }

        case ActionType.LogOut: {
            return initialState;
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
                isLogged: true,
                userDetails: action.payload
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
                isLogged: true,
                userDetails: action.payload
            }
        }
        default: {
            return state;
        }
    }
}