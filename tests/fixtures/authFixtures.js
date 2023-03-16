
export const initialState =  {
    status: 'checking', // 'checking' 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null 
}

export const authenticatedState =  {
    status: 'authenticated', // 'checking' 'not-authenticated', 'authenticated'
    uid: '123ABC',
    email: 'demo@gmail.com',
    displayName: 'Demo user',
    photoURL: 'https://demmo.jpg',
    errorMessage: null 
}

export const notAuthenticatedState =  {
    status: 'not-authenticated', // 'checking' 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null 
}

export const demoUser = {
    uid: '123ABC',
    email: 'demo@gmail.com',
    displayName: 'Demo user',
    photoURL: 'https://demmo.jpg',
}
