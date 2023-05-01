import {Box, NativeBaseProvider, Text} from 'native-base';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from 'redux/store';
import theme from '../../theme';
import LinearGradient from 'react-native-linear-gradient';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};
const AppContainer = props => {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme} config={config}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          {/* <StripeProvider
              publishableKey="pk_test_51N2DsJCnPuYN2rinLMHNM7SnzPHMrhgZOdtKb7xUBUntzatdw8utlZpCNTwZyhIL9ShQBddovI4lQA2TWEZBDRgR009G3YVIMz"
              //   urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
              merchantIdentifier="merchant.com.olaads" // required for Apple Pay
            > */}
          <StatusBar
            translucent={true}
            backgroundColor={'transparent'}
            // barStyle={'light-content'}
          />
          <NavigationContainer>
            {/* <LinearGradient colors={['#FF416C', '#FF4B2B']} style={{flex: 1}}> */}
            {/* Your app code here */}

            {props.children}
          </NavigationContainer>
          {/* </LinearGradient> */}
          {/* </StripeProvider> */}
        </PersistGate>
      </NativeBaseProvider>
    </Provider>
  );
};

export default AppContainer;
