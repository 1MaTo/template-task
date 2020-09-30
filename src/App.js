import React, { useEffect, useState } from 'react';
import { Login } from './pages/Login'
import { PrivateRoute, PublicRoute } from './AuthRoute'
import { Challenges } from './pages/Challenges'
import {
  BrowserRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { ChallengesRequest, LoginByIdRequest, TasksRequest } from './requests/Request';
import { updateTasks } from './redux/reducers/tasksSlice';
import { Tasks } from './pages/Tasks';
import { getUserId, setUserId } from './db/dbApi';
import { logIn, updateUser } from './redux/reducers/userSlice';
import { Loading } from './components/loading/Loading';
import { PagesConstructor } from './PagesConstructor';
import { clearPandingQueue, update } from './redux/reducers/challengesSlice';
import { setOnlineStatus } from './redux/reducers/userSlice'

const App = () => {

  const dispatch = useDispatch()

  const isLogin = useSelector(state => state.user.isLogin)
  const userId = useSelector(state => state.user.user && state.user.user._id)
  const isOnline = useSelector(state => state.user.isOnline)

  const [isLoading, setLoading] = useState(true)

  // load tasks challenges if id exist
  useEffect(() => {
    if (isLogin) {
      ChallengesRequest()
        .then(({ data, connetionStatus }) => {
          if (connetionStatus === "offline") {
            dispatch(setOnlineStatus(false))
          } else {
            dispatch(setOnlineStatus(true))
            dispatch(clearPandingQueue())
          }
          dispatch(update(data))
        })
      TasksRequest(userId)
        .then(tasks => {
          if (tasks) {
            dispatch(updateTasks(tasks))
          }
        })
    }
  }, [isLogin,isOnline])


  // Auto login if id exist
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
      <Router basename="/template-task">
        <Switch>
          <PublicRoute restricted={true} component={Login} path="/login" />
          <PrivateRoute component={PagesConstructor} page={Tasks} path="/tasks" />
          <PrivateRoute component={PagesConstructor} page={Challenges} path="/challenges" />
          <Redirect to="/login" />
        </Switch>
      </Router>
  );
}

export default App;