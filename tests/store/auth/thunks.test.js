import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, sigInWithGoogle } from '../../../src/firebase/providers';
import { chekingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSigIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => { 
    
    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());
   
    test('debe de invocar el checkingCredentials', async() => { 

        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith(chekingCredentials());

    });

    test('startGoogleSigIn debe de llamar al chekingCredentials y login - Exito', async( ) => { 
       
        const loginData = { ok: true, ...demoUser };
        await sigInWithGoogle.mockResolvedValue( loginData );

        // thunks
        await startGoogleSigIn()(dispatch);
        expect( dispatch ).toHaveBeenCalledWith( chekingCredentials());
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ));

    });

    test('startGoogleSigIn debe de llamar al chekingCredentials y logout - Error', async( ) => { 
       
        const loginData = { ok: false, errorMessage:'Un error en Google' };
        await sigInWithGoogle.mockResolvedValue( loginData );

        // thunks
        await startGoogleSigIn()(dispatch);
        expect( dispatch ).toHaveBeenCalledWith( chekingCredentials());
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ));
        

    });

    test('startCreatingUserWithEmailPassword debe de llamar al chekingCredentials y login - Exito', async() => { 
       
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456', displayName: 'demoUser'};

        await registerUserWithEmailPassword.mockResolvedValue( loginData );
        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( chekingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startCreatingUserWithEmailPassword debe de llamar al chekingCredentials y logout - Error', async() => { 
       
        const loginData = { ok: false, messageError: 'Un error en Firebase' };
        const formData = { email: demoUser.email, password: '123456', displayName: 'demoUser'};

        await registerUserWithEmailPassword.mockResolvedValue( loginData );
        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( chekingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );

    });
    test('startLoginWithEmailPassword debe de llamar al chekingCredentials y login - Exito', async() => { 
       
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456'};

        await loginWithEmailPassword.mockResolvedValue( loginData );
        await startLoginWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( chekingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startLoginWithEmailPassword debe de llamar al chekingCredentials y logout - Error', async() => { 
       
        const loginData = { ok: false, messageError: 'Un error en Firebase' };
        const formData = { email: demoUser.email, password: '123456'};

        await loginWithEmailPassword.mockResolvedValue( loginData );
        await startLoginWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( chekingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );

    });

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => { 
       
        await startLogout()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );


    });

    // test startCreatingUserWithEmailPassword -Exito, -Error,  startLoginWithEmailPassword -Error


});