import React from 'react';

import AppContainer from './src/components/AppContainer';
import MainScreen from './src/screens/MainScreen';
import { connectToDevTools } from "react-devtools-core";
import {addPlugin} from 'react-native-flipper';

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
