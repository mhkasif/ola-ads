import { StripeProvider } from '@stripe/stripe-react-native';
import { NativeBaseProvider, Text } from 'native-base';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'redux/store';
import theme from '../../theme';
const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};
const AppContainer = props => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider theme={theme} config={config}>
          <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
            {/* <StripeProvider
              publishableKey="pk_test_51N2DsJCnPuYN2rinLMHNM7SnzPHMrhgZOdtKb7xUBUntzatdw8utlZpCNTwZyhIL9ShQBddovI4lQA2TWEZBDRgR009G3YVIMz"
              //   urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
              merchantIdentifier="merchant.com.olaads" // required for Apple Pay
            > */}
              {props.children}
            {/* </StripeProvider> */}
          </PersistGate>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default AppContainer;
