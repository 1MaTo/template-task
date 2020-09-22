import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store'
import { Provider } from 'react-redux'
import theme from './styles/theme.scss'
import './styles/global.scss'
import { ThemeProvider, StylesProvider, createMuiTheme } from '@material-ui/core/styles'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3000'

const themeMui = createMuiTheme({
  palette: {
    primary: {
      light: theme.primaryLight,
      main: theme.primaryMain,
      dark: theme.primaryDark,
      contrastText: theme.primaryText
    },
    secondary: {
      light: theme.secondaryLight,
      main: theme.secondaryMain,
      dark: theme.secondaryDark,
      contrastText: theme.secondaryText
    }
  },
  typography: {
    fontFamily: [
      'Open Sans', 'Roboto', 'Arial'
    ].join(',')
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={themeMui}>
          <App />
        </ThemeProvider>
      </StylesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

Notification.requestPermission(function (status) {
  console.log('Notification permission status:', status);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();