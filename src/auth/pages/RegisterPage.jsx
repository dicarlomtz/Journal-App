import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'

import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'
import { useMemo } from 'react'
import { authenticationStatuses } from '../../store/auth/authSlice'

const registerFormData = {
    displayName: '',
    email: '',
    password: ''
}

const registerFormValidators = {
    displayName: [(value) => value.length >= 1, 'The full name is required'],
    email: [(value) => value.includes('@') , 'The input must be a valid email'],
    password: [(value) => value.length >= 6, 'The password must have at least 6 characters']
}

export const RegisterPage = () => {

    const dispatch = useDispatch();

    const { displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid,
        setFormSubmittedData, formSubmitted, formState
    } = useForm(registerFormData, registerFormValidators);

    const { status, errorMessage } = useSelector(state => state.auth);
    const isAuthenticating = useMemo(() => status === authenticationStatuses.checking, [status]);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmittedData();

        if (!isFormValid) return;

        dispatch(startCreatingUserWithEmailPassword(formState));
    }

  return (
      <AuthLayout title='Register'>
            <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn aniomate__faster'>
              <Grid container>
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label="Name"
                            type="text"
                            placeholder="Your full name"
                            name="displayName"
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}
                            fullWidth />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label="email"
                            type="email"
                            placeholder="example@domain.com"
                            name="email"
                            value={ email }
                            onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                            fullWidth />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="Your password"
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                            fullWidth
                            />
                    </Grid>

                  <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                       <Grid item xs={ 12 } display={!!errorMessage ? '' : 'none'}>
                          <Alert severity='error' >{ errorMessage }</Alert>
                        </Grid>

                        <Grid item xs={ 12 }>
                          <Button disabled={ isAuthenticating } variant="contained" type="submit" fullWidth>Register</Button>
                        </Grid>
                    </Grid>

                  <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{ mr: 1}}>Do you have an account?</Typography>
                        <Link component={ RouterLink } color='inherit' to='/auth/login'>
                            Login
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
  )
}
