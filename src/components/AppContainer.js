import {NativeBaseProvider, Text} from 'native-base';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import theme from '../../theme';
import {persistor, store} from 'redux/store';

const AppContainer = props => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>
          <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
            {props.children}
          </PersistGate>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default AppContainer;
