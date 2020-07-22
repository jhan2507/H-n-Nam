import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store';
import routes from 'routes/routes';
import { renderRoutes } from 'react-router-config';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
import momentTimezone from 'moment-timezone';
import moment from 'moment';
import './font/GoogleSans-Medium.ttf';
import './font/GoogleSans-Regular.ttf';
import 'moment/locale/vi';

moment.locale('vi');
momentTimezone.tz.setDefault('Asia/Ho_Chi_Minh');

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <Router history={createBrowserHistory()}>{renderRoutes(routes)}</Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
