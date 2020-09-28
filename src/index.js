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

axios.defaults.baseURL = 'http://9861898cc3b4.ngrok.io'


//Handler for BroadCastUpdate
/* navigator.serviceWorker.addEventListener('message', async (event) => {

  // Optional: ensure the message came from workbox-broadcast-update
  if (event.data.meta === 'workbox-broadcast-update') {
    const { cacheName, updatedUrl } = event.data.payload;

    // Do something with cacheName and updatedUrl.
    // For example, get the cached content and update
    // the content on the page.
    console.log(event.data)
    const cache = await caches.open(cacheName);
    const updatedResponse = await cache.match(updatedUrl);
    console.log(updatedResponse.body)
  }
}); */

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