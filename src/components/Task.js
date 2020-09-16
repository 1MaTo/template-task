import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { displayNotification } from '../notifications'

const CompleteButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

const DeleteButton = withStyles((theme) => ({
  root: {
    marginLeft: 'auto',
    color: theme.palette.getContrastText(red[700]),
    backgroundColor: red[700],
    '&:hover': {
      backgroundColor: red[900],
    },
  },
}))(Button);

const useStyles = makeStyles(() => ({
  task: {
    height: 'fit-content;',
    margin: '35px;',
    maxWidth: '800px;',
    minWidth: '300px;',
  },
  taskComplete: {
    background: '#4caf50'
  },
}));

function Task({ data, handleUpdateTask }) {
  const classes = useStyles()

  const [taskInfo, setInfo] = useState(data)

  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setInfo(data)
    setLoading(false)
  }, [data])

  const completeTask = () => {
    setInfo({ ...taskInfo, status: "Завершено" })
    displayNotification('😃 Ты завершил задание 😃')
  }

  const deleteTask = () => {
    setInfo({ ...taskInfo, isDeleted: true })
    displayNotification('😯 Ты удалил задание 😯')
  }

  return (
    isLoading ? <></> :
      taskInfo.isDeleted ? <></> :
        <Card
          className={clsx(classes.task, taskInfo.status === "Завершено" && classes.taskComplete)}
          style={{ backgroundColor: taskInfo.status === "Завершено" && "#b4e8b4" }}>
          <CardActionArea onClick={() => handleUpdateTask(taskInfo)}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {taskInfo.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {taskInfo.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Divider />
          <CardActions disableSpacing>
            <CompleteButton disabled={taskInfo.status === "Завершено"} onClick={completeTask} size="medium">{taskInfo.status === "Завершено" ? 'Завершено' : 'Завершить'}</CompleteButton>
            <DeleteButton onClick={deleteTask} size="medium">{'Удалить'}</DeleteButton>
          </CardActions>
        </Card>
  );
}

export default Task;
