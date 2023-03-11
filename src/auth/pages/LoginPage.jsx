import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as LinkRouter }  from 'react-router-dom';
import Google from '@mui/icons-material/Google';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../layout/AuthLayout';

import { useForm } from '../../hooks/useForm';
import { checkingAuthentication, startGoogleSigIn, startLoginWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

const { status, errorMessage } = useSelector( state => state.auth );

const dispatch = useDispatch();

const {email, password, onInputChange } = useForm( formData );

const isAuthenticating = useMemo( () => status === 'checking', [ status ]);


const onSubmit = ( event ) =>{
  event.preventDefault();

  // console.log({ email, password });

  //! No es está la acción a despachar
  // dispatch( checkingAuthentication());
  
  dispatch( startLoginWithEmailPassword({email, password}));
}

const onGoogleSignIn = () => {
  dispatch( startGoogleSigIn() );
  console.log('onGoogleSignIn');
}

  return (
    <AuthLayout title='Login'>
          <form onSubmit={ onSubmit }className='animate__animated animate__fadeIn animate__faster'>
            <Grid container>
                <Grid item xs={ 12 } sx={{mt: 2 }}>
                  <TextField 
                    label="Correo" 
                    type="email" 
                    placeholder="correo@google.com"
                    fullWidth
                    name="email"
                    value={ email }
                    onChange={ onInputChange }
                    />
                </Grid>

                <Grid item xs={ 12 } sx={{mt: 2 }}>
                  <TextField 
                    label="contraseña" 
                    type="password" 
                    placeholder="contraseña"
                    fullWidth
                    name="password"
                    value={ password }
                    onChange={ onInputChange }
                    />
                </Grid>

                <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                <Grid 
                    item xs={ 12 } 
                    sm={ 12 }
                    display={ !! errorMessage? '': 'none'}>
                    <Alert severity='error'>{ errorMessage }</Alert>
                  </Grid>
                  <Grid item xs={ 12 } sm={ 6 }>
                    <Button
                      disabled={ isAuthenticating } 
                      type='submit' 
                      variant='contained' 
                      fullWidth>
                      Login
                    </Button>
                  </Grid>
                  <Grid item xs={ 12 } sm={ 6 }>
                    <Button
                      onClick={ onGoogleSignIn } 
                      variant='contained'
                      disabled={ isAuthenticating } 
                      fullWidth>
                      <Google/>
                      <Typography sx={{ ml: 1 }}>Google</Typography>
                    </Button>
                  </Grid>
                </Grid>

                <Grid container direction='row' justifyContent='end'>
                  <Link component={ LinkRouter } color='inherit' to="/auth/register">
                    Crear cuenta
                  </Link>
                </Grid>

            </Grid>

          </form>
    </AuthLayout>
  )
}
