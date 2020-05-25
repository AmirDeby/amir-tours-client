import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { registerAction } from '../../actions';
import { IState } from '../../reducer';

export interface IRegisterProps {
    register(firstName: string, lastName: string, password: string, userName: string): void,
    isLogged: boolean,
    errorMessage: boolean,
}
interface IRegisterState {
    firstName: string,
    lastName: string,
    password: string,
    userName: string,

}

class _Register extends React.Component<IRegisterProps, IRegisterState> {
    state: IRegisterState = {
        firstName: "",
        lastName: "",
        password: "",
        userName: "",
    }
    public render() {
        const { isLogged, errorMessage } = this.props;
        const isFilled = this.canBeRegister()
        if (isLogged) {
            return <Redirect to="/vacations" />
        }
        return (
            <div>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div>
                        <Typography component="h1" variant="h5">
                            Sign up
                       </Typography>
                        <form onSubmit={this.onRegisterSubmit} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={this.handlerChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                        onChange={this.handlerChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="userName"
                                        label="Enter unique UserName"
                                        name="userName"
                                        autoComplete="userName"
                                        onChange={this.handlerChange}
                                    />
                                    <span style={{ color: "red" }} className={["error-user", errorMessage ? 'visible' : 'invisible'].join(' ')}>*The user exists, try a different name</span>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={this.handlerChange}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                style={{ marginTop: "13px" }}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={!isFilled}
                            >
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link to="/login">
                                        Already have an account? Sign in
                                </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>

                </Container>
            </div>
        );
    }
    onRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { firstName, lastName, password, userName } = this.state
        const { register } = this.props;
        register(firstName, lastName, password, userName)

    }
    canBeRegister() {
        const { firstName, lastName, password, userName } = this.state
        return (
            firstName.length > 0 &&
            lastName.length > 0 &&
            password.length > 0 &&
            userName.length > 0
        );
    }

    handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        this.setState({ [name]: value } as any)
    }
}

const mapStateToProps = (state: IState) => {
    return {
        isLogged: state.isLogged,
        errorMessage: state.errorMessage !== "",
    }
}

const mapDispatchToProps = {
    register: registerAction
}

export const Register = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Register)
