import React, { Component } from 'react';
import Routes from './src/Routes';
import store from './src/publics/Store';
import { Provider } from 'react-redux';
export default class App extends Component<{}> {
    render() {
      return (
        <Provider store={store}>
        <Routes/>
        </Provider>
      );
    }
}
