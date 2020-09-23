import React, { useEffect } from 'react';
import { Login } from './pages/Login'
import { AuthRoute } from './AuthRoute'
import { Challenges } from './pages/Challenges'
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { TasksRequest } from './requests/Request';
import { updateTasks } from './redux/reducers/tasksSlice';
import { Tasks } from './pages/Tasks';

const App = () => {

  const isLogin = useSelector(state => state.user.user)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isLogin) {
      TasksRequest(isLogin._id)
        .then(tasks => {
          if (tasks) {
            dispatch(updateTasks(tasks))
          }
        })
    }
  }, [isLogin])

  return (
    <Router>
      <Switch>
        <AuthRoute type='guest' path="/login" render={Login} />
        <AuthRoute type='private' path="/challenges" render={Challenges} />
        <AuthRoute type='private' path="/tasks" render={Tasks} />
        <Redirect to="/login"/>
      </Switch>
    </Router>
  );
}

export default App;