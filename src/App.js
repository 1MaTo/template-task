import React, { useEffect, useState } from 'react';
import { Login } from './pages/Login'
import { PrivateRoute, PublicRoute } from './AuthRoute'
import { Challenges } from './pages/Challenges'
import {
  BrowserRouter as Router,
  Redirect,
  Switch} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { LoginByIdRequest, TasksRequest } from './requests/Request';
import { updateTasks } from './redux/reducers/tasksSlice';
import { Tasks } from './pages/Tasks';
import { getUserId, setUserId } from './db/dbApi';
import { logIn, updateUser } from './redux/reducers/userSlice';
import { Loading } from './components/loading/Loading';
import { PagesConstructor } from './PagesConstructor';

const App = () => {

  const isLogin = useSelector(state => state.user.isLogin)
  const userId = useSelector(state => state.user.user && state.user.user._id)

  const [isLoading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isLogin) {
      TasksRequest(userId)
        .then(tasks => {
          if (tasks) {
            dispatch(updateTasks(tasks))
          }
        })
    }
  }, [isLogin])

  useEffect(() => {
    getUserId()
      .then(id => {
        if (id) {
          LoginByIdRequest(id)
            .then(user => {
              if (user) {
                dispatch(updateUser(user))
                dispatch(logIn())
                setLoading(false)
              } else {
                setUserId(null)
                setLoading(false)
              }
            })
        } else {
          setLoading(false)
        }
      })
  }, [isLogin])

  return (
    isLoading ? <Loading /> :
      <Router>
        <Switch>
          <PublicRoute restricted={true} component={Login} path="/login" exact />
          <PrivateRoute component={PagesConstructor} page={Tasks} path="/tasks" exact />
          <PrivateRoute component={PagesConstructor} page={Challenges} path="/challenges" exact />
          <Redirect to="/login"/>
        </Switch>
      </Router>
  );
}

export default App;