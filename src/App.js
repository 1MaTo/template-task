import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import Task from './components/Task'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import EditableTask from './components/EditableTask'
import update from 'react-addons-update';

const useStyles = makeStyles((theme) => ({
  root: {
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

const JSONdb = [
  {
    id: "1",
    name: "Task1",
    status: "В процессе",
    description: "Особое задание для продвинутых",
    isDeleted: false,
  },
  {
    id: "2",
    name: "Task2",
    status: "В процессе",
    description: "Очень простое задание",
    isDeleted: false,
  },
  {
    id: "3",
    name: "Task3",
    status: "В процессе",
    description: "Тут нужно подумать",
    isDeleted: false,
  },
  {
    id: "4",
    name: "Task4",
    status: "В процессе",
    description: "Особое задание для продвинутых",
    isDeleted: false,
  },
  {
    id: "5",
    name: "Task5",
    status: "В процессе",
    description: "Очень простое задание",
    isDeleted: false,
  },
  {
    id: "6",
    name: "Task6",
    status: "В процессе",
    description: "Тут нужно подумать",
    isDeleted: false,
  },
]

function App() {
  const classes = useStyles();
  const [db, setDB] = useState([...JSONdb])
  const [openEditTask, setOpenEditTask] = useState(false)
  const [taskDataToUpdate, setTaskDataToUpdate] = useState(null)
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const addTask = (data) => {
    if (data) {
      const updateIndex = db.findIndex(element => element.id === data.id)
      if (updateIndex !== -1) {
/*         const newDB = [...db]
        newDB[updateIndex] = {
          id: data.id,
          name: data.name,
          description: data.description,
          status: data.status,
          isDeleted: data.isDeleted
        } */
        const newData = update(db, {
          [updateIndex]: {$merge: data}
        })
        setDB([...newData])
      } else {
        setDB([...db, data])
      }
    }
    setTaskDataToUpdate(null)
    setOpenEditTask(false)
    forceUpdate()
  }

  const openForm = (dataToUpdate) => {
    if (dataToUpdate) {
      setTaskDataToUpdate(dataToUpdate)
      setOpenEditTask(true)
    } else {
      setTaskDataToUpdate(null)
      setOpenEditTask(true)
    }
  }

  return (
    <div className={classes.root}>
      {db.map(task => {
        return <Task key={task.id} data={task} handleUpdateTask={openForm} />
      })}
      <Fab
        className={classes.fab} aria-label="add"
        onClick={() => openForm(null)}>
        <AddIcon />
      </Fab>
      <EditableTask taskDataToUpdate={taskDataToUpdate} open={openEditTask} handleClose={addTask} />
    </div>
  );
}

export default App;
