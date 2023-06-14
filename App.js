import React from 'react';

import {addPlugin} from 'react-native-flipper';
import AppContainer from './src/components/AppContainer';
import MainScreen from './src/screens/MainScreen';

addPlugin({
  getId() {
    return 'MyFlipperPlugin';
  },
  onConnect(connection) {
    console.log('connected');
  },
  onDisconnect() {
    console.log('disconnected');
  },
  runInBackground() {
    return false;
  },
});
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;

function App() {
  return (
    <AppContainer>
      {/* <Todo /> */}
      <MainScreen />
    </AppContainer>
  );
}

export default App;
