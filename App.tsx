import React, { PureComponent } from 'react';
// import { connect } from 'react-redux';
// import { AnyAction } from 'redux';
// import { ThunkDispatch } from 'redux-thunk';
// import { StatusBar, View, Text } from 'react-native';
import Root from 'src/screens/root';

/**
 * Interfaces
 */
interface IAppProps {}

class App extends PureComponent<IAppProps> {
  render() {
    return <Root />;
  }
}
export default App;
