import { Link as RouterLink } from 'react-router-dom'
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startEmailPasswordLogin, startGoogleLogin } from '../../store/auth/thunks'
import { useMemo } from 'react'
import { authenticationStatuses } from '../../store/auth/authSlice'

const loginFormData = {
    email: '',
    password: ''
};

const loginFormValidators = {
    email: [(value) => value.includes('@'), 'The input must be a valid email'],
    password: [(value) => value.length > 0, 'The password must be entered']
};

export const LoginPage = () => {

    const { status, errorMessage } = useSelector(state => state.auth);
    const isAuthenticating = useMemo(() => status === authenticationStatuses.checking, [status]);

    const dispatch = useDispatch();

    const { email, password, onInputChange,
        isFormValid, emailValid, passwordValid,
        setFormSubmittedData, formSubmitted, formState
    } = useForm(loginFormData, loginFormValidators);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmittedData();

        if (!isFormValid) return;

        dispatch(startEmailPasswordLogin(formState));
    }

    const onGoogleLogin = () => {
        dispatch(startGoogleLogin())
    }

    return (
        <AuthLayout title='Login'>
            <form onSubmit={onSubmit} className='animate__animated animate__fadeIn aniomate__faster'>
                <Grid container>
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label="email"
                            type="email"
                            placeholder="example@domain.com"
                            fullWidth
                            name='email'
                            value={email}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                            onChange={onInputChange} />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="Your password"
                            fullWidth
                            name='password'
                            value={password}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                            onChange={onInputChange} />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={ 12 } display={!!errorMessage ? '' : 'none'}>
                            <Alert severity='error' >{ errorMessage }</Alert>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button type="submit" variant="contained" disabled={ isAuthenticating }  fullWidth>Login</Button>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button onClick={onGoogleLogin} variant="contained" disabled={ isAuthenticating } fullWidth>
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Link component={ RouterLink } color='inherit' to='/auth/register'>
                            Register
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
