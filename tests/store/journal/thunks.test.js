import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { loadNotes } from "../../../src/helpers";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from "../../../src/store/journal/journalSlice";
import { startLoadingNotes, startNewNote } from "../../../src/store/journal/thunks";


describe('Pruebas en Journal Thunks', () => { 
    // TODO: Realizar pruebas en journalSlice, que son muy parecidas al authSlice

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());


    test('startNewNote debe de crear una nueva nota en blanco', async() => { 

        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid: uid }});
       
        await startNewNote()(dispatch, getState );

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote());
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote( {
            body: '',
            title:'',
            imageUrls: [],
            id: expect.any( String ),
            date: expect.any( Number )
        } ));
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote( {
            body: '',
            title:'',
            imageUrls: [],
            id: expect.any( String ),
            date: expect.any( Number )
        } ));

        // Borrar de firebase (todos)
        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes`);
        const docs = await getDocs( collectionRef );

        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );
        await Promise.all( deletePromises );


    });

    test('startLoadingNotes tiene que devolver las notas del usuario', async() => { 

        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid: uid }});

        await startLoadingNotes()(dispatch, getState);
        const notes = await loadNotes( uid );

        expect( dispatch ).toHaveBeenCalledWith( setNotes( notes ) );
       
    });

    

    //TODO: Realizar el resto de las pruebas de los journal thunks.
});