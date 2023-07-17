import CustomButton from '@components/CustomButton/CustomButton';
import CustomInput from '@components/CustomInput/CustomInput';
import CustomText from '@components/CustomText/CustomText';
import FacebookButton from '@components/FacebookButton/FacebookButton';
import GoogleButton from '@components/GoogleButton/GoogleButton';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '@utils/colors';
import Logo from 'assets/logo.png';
import { Formik } from 'formik';
import {
  Box,
  Center,
  Divider,
  HStack,
  Heading,
  Image,
  Link,
  StatusBar,
  VStack,
} from 'native-base';
import { connect } from 'react-redux';
import { loginAction } from 'redux/authSlice/authActions';

import AppleButton from '@components/AppleButton/AppleButton';
import FullScreenLoader from '@components/FullScreenLoader/FullScreenLoader';
import KeyboardAvoidingInputWrapper from '@components/KeyboardAvoidingInputWrapper/KeyboardAvoidingInputWrapper';
import YUP from '@components/YUP/YUP';
import { StackActions } from '@react-navigation/native';
import { linearGradient } from '@utils/colors';
import { useState } from 'react';
import { Platform } from 'react-native';
import { SCREEN_NAMES } from '../screenNames';

// ...

// In your login screen component, after the user has successfully logged in:

const formValidation = YUP.object().shape({
  email: YUP.string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  password: YUP.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
const initialValues = {
  email: '',
  password: '',
};
const LoginScreen = ({loginAction}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {navigate, ...navigation} = useNavigation();
  const resetAction = StackActions.replace(SCREEN_NAMES.MAIN);

  const handleLogin = async values => {
    console.log({values});

    let {error, data} = await loginAction(values);
    if (!error) {
      navigation.dispatch(resetAction);
    }
  };
  const fields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      validate: true,
      inputProps: {
        placeholder: 'Enter your email',
        keyboardType: 'email-address',
      },
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      validate: true,
      inputProps: {
        placeholder: 'Enter your password',
        // secureTextEntry: true,
      },
    },
  ];
  return (
    <Box
      // bg="pink.500"
      style={{
        flex: 1,
      }}>
      {isLoading && <FullScreenLoader />}
      <StatusBar />
      <Box
        bg={{
          linearGradient,
        }}
        style={{
          height: '28%',
        }}>
        <Center
          style={{
            paddingTop: '20%',
          }}>
          <Image source={Logo} alt="Logo" />
        </Center>
      </Box>
      <Box
        bg="white"
        // bg="red.500"
        // margin
        borderTopRadius={30}
        style={{
          flex: 1,
          marginTop: '-6%',
          // height: '100%',
        }}>
        <KeyboardAvoidingInputWrapper>
          <Center bg="transparent" w="100%">
            <Box bg="transparent" p="2" py="8" w="90%">
              <Heading
                size="lg"
                fontWeight="600"
                color="coolGray.800"
                _dark={{
                  color: 'warmGray.50',
                }}>
                Welcome
              </Heading>
              <Heading
                mt="1"
                _dark={{
                  color: 'warmGray.200',
                }}
                color="coolGray.600"
                fontWeight="medium"
                size="xs">
                Log In to continue!
              </Heading>
              <Formik
                initialValues={initialValues}
                onSubmit={handleLogin}
                validationSchema={formValidation}>
                {({isSubmitting, handleSubmit}) => (
                  <VStack space={3} mt="5">
                    {fields.map(field => (
                      <CustomInput {...field} key={field.name} />
                    ))}
                    <Link
                      onPress={() => navigate(SCREEN_NAMES.FORGOT_PASSWORD)}
                      _text={{
                        fontSize: 'xs',
                        fontWeight: '500',
                        color: COLORS.primary,
                        underline: false,
                      }}
                      // alignSelf="flex-end"
                      mt="1">
                      Forgot your password?
                    </Link>
                    <CustomButton
                      buttonProps={{
                        // colorScheme: 'indigo',
                        onPress: handleSubmit,
                        isLoading: isSubmitting,
                        isLoadingText: 'Logging In...',
                      }}>
                      Log In
                    </CustomButton>
                  </VStack>
                )}
              </Formik>
              <HStack mt="6" justifyContent="center">
                <CustomText
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  Don't you have an account?{' '}
                </CustomText>
                <Link
                  _text={{
                    color: COLORS.primary,
                    fontWeight: 'medium',
                    fontSize: 'sm',
                    underline: false,
                  }}
                  onPress={() => navigate(SCREEN_NAMES.SIGNUP)}>
                  Sign Up
                </Link>
              </HStack>
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                my={4}>
                <Divider w="45%" borderColor="gray.300" />
                <CustomText mx={3} color="gray.300">
                  OR
                </CustomText>
                <Divider w="45%" borderColor="gray.300" />
              </Box>
              {Platform.OS === 'ios' && (
                <Box>
                  <AppleButton w="100%" setIsLoading={setIsLoading} />
                </Box>
              )}
              <HStack space={3} justifyContent="center">
                <FacebookButton setIsLoading={setIsLoading} />
                <GoogleButton setIsLoading={setIsLoading} />
              </HStack>
            </Box>
          </Center>
        </KeyboardAvoidingInputWrapper>
      </Box>
    </Box>
  );
};
const actions = {
  loginAction,
};
export default connect(null, actions)(LoginScreen);
