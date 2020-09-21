import React, { Suspense, useEffect } from 'react';
import './App.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { TasksList } from './components/tasks/TasksList';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEditForm } from './redux/reducers/tasksSlice'
import { EditableTask } from './components/tasks/EditableTaskForm'

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#eeeeee',
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'space-evenly;',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    }
  },
}));


function App() {
  const classes = useStyles();
  const isFormOpen = useSelector(store => store.tasks.openEditForm)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
    /* requestUpdate()
      .then(response => {
        setDB(response.body)
      })
      .catch(error => {
        console.log(error)
      }) */
  }, [])



  const Loading = () => {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className={classes.root}>
      <Suspense fallback={<Loading />}>
        <TasksList />
        <Fab
          className={classes.fab} aria-label="add"
          onClick={() => dispatch(toggleEditForm())}>
          <AddIcon />
        </Fab>
        <EditableTask open={isFormOpen} />
      </Suspense>
    </div>
  );
}

export default App;