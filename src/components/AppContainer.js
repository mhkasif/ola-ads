import { NativeBaseProvider } from 'native-base';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'redux/store';
// import SplashScreen from 'screens/SplashScreen/SplashScreen';
import theme from '../../theme';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};
const AppContainer = props => {

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}


        // barStyle={'light-content'}
      />
      <NativeBaseProvider theme={theme} config={config}>
        <NavigationContainer>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {/* <LinearGradient colors={['#FF416C', '#FF4B2B']} style={{flex: 1}}> */}
              {props.children}
            </PersistGate>
          </Provider>
        </NavigationContainer>
        {/* </LinearGradient> */}

      </NativeBaseProvider>
    </>
  );
};

export default AppContainer;
