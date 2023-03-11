import { useDispatch, useSelector } from 'react-redux';
import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { startNewNote } from '../../store/journal/thunks';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';



export const JournalPage = () => {

  const dispatch = useDispatch();

  const { isSaving, active } = useSelector( state => state.journal);
  
  const onClickNewNote = () => {

    dispatch( startNewNote() );

  }

  return (
    <JournalLayout>
      {/* <Typography >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas esse, nobis inventore nam, veniam at, harum explicabo nisi alias necessitatibus fugit voluptatem libero consequuntur distinctio odio officia minus. Alias, repellat.</Typography> */}
    
      {
         ( !!active ) 
         ? <NoteView/>
         : <NothingSelectedView/>
           
      }

      <IconButton
        onClick={ onClickNewNote }
        disabled={ isSaving }
        size='large'
        sx={{ 
            color: 'white',
            backgroundColor: 'error.main',
            ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
            position: 'fixed',
            right: 50,
            bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
    
  )
}
