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

axios.defaults.baseURL = 'https://25d3f928c7f7.ngrok.io'

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

serviceWorker.register();

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