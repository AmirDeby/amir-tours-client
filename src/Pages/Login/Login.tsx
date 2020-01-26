import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { IState } from '../../reducer';
import { logInAction } from '../../actions';


export interface ILoginProps {
    isLogged: boolean,
    login(userName: string, password: string): void,
    
}

interface ILoginState {
    userName: string,
    password: string,
}

class _Login extends React.Component<ILoginProps, ILoginState> {
    state: ILoginState = {
        userName: "",
        password: "",
    }

    public render() {
        const { isLogged } = this.props;
        if (isLogged) return <Redirect to="/vacations" />
        return (
            <div>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div>

                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form onSubmit={this.onSubmit} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="userName"
                                label="enter Your User Name"
                                name="userName"
                                autoComplete="userName"
                                autoFocus
                                onChange={this.onChangeHandler}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.onChangeHandler}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary">
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </div>
        );
    }

    onSubmit = async (e: React.FormEvent) => {
        const { login } = this.props
        const { userName, password } = this.state;
        e.preventDefault();
        login(userName, password);
        


    }

    onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        this.setState({ [name]: value } as any)
    }

}

const mapStateToProps = (state: IState) => ({
    isLogged: state.isLogged,

})

const mapDispatchToProps = {
    login: logInAction,
    
}

export const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Login)