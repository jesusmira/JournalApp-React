import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth';
import { startGoogleSigIn } from '../../../src/store/auth/thunks';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn= jest.fn();
const mockstartLoginWithEmailPassword= jest.fn();

jest.mock('../../../src/store/auth/thunks', () =>({
    startGoogleSigIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockstartLoginWithEmailPassword({ email, password });
    }
}));

jest.mock('react-redux', () => ( {
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) =>fn()
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },

    preloadedState:{
       auth: notAuthenticatedState     
    }
});

describe('Pruebas en <LoginPage/>', () => { 

    beforeEach( () => jest.clearAllMocks() );
   
    test('debe de mostrar el componente correctamente', () => { 
       
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        // screen.debug();
        expect( screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);

    });

    test('boton de google debe de llamar al startGoogleSigIn()', () => { 
       
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);

        expect( mockStartGoogleSignIn ).toHaveBeenCalled();

    }); 

    test('submit debe de llamar al startLoginWithEmailPassword', () => { 
       
        const email    = 'test@test.com';
        const password = '123456';

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Correo' } );
        fireEvent.change(emailField, { target: { name: 'email', value: email } } );    
        
        const passwordField = screen.getByTestId( 'password' );
        fireEvent.change(passwordField, { target: { name: 'password', value: password } } );

        const loginForm = screen.getByLabelText( 'submit-form' );

        fireEvent.submit( loginForm );

        expect( mockstartLoginWithEmailPassword ).toHaveBeenCalledWith({
            email: email,
            password: password
        })
    }); 


});