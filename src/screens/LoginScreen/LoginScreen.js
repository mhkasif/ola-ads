import CustomButton from '@components/CustomButton/CustomButton';
import CustomInput from '@components/CustomInput/CustomInput';
import CustomText from '@components/CustomText/CustomText';
import FacebookButton from '@components/FacebookButton/FacebookButton';
import GoogleButton from '@components/GoogleButton/GoogleButton';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '@utils/colors';
import Logo from 'assets/logo.png';
import {Formik} from 'formik';
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
import {connect} from 'react-redux';
import {loginAction} from 'redux/authSlice/authActions';

import {SCREEN_NAMES} from '../screenNames';
import YUP from '@components/YUP/YUP';
import {linearGradient} from '@utils/colors';
import {StackActions} from '@react-navigation/native';

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
  email: 'haseeb@gmail.com',
  password: '324565trewf',
};
const LoginScreen = ({loginAction}) => {
  const {navigate, ...navigation} = useNavigation();
  const resetAction = StackActions.replace(SCREEN_NAMES.MAIN);

  const handleLogin = async values => {
    console.log({values});
    try {
      await loginAction(values);
      // navigate(SCREEN_NAMES.MAIN);
      navigation.dispatch(resetAction);
      // navigate(SCREEN_NAMES.OTP)

      return;
    } catch (error) {
      console.error({error});
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
    // <KeyboardAvoidingInputWrapper >
    <Box
      // bg="pink.500"
      style={{
        flex: 1,
      }}>
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
              Log in to continue!
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
                    Log in
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

            <HStack space={3} justifyContent="center">
              <FacebookButton w="45%" />
              <GoogleButton w="45%" />
            </HStack>
          </Box>
        </Center>
      </Box>
    </Box>
    // {/* </KeyboardAvoidingInputWrapper> */}
  );
};
const actions = {
  loginAction,
};
export default connect(null, actions)(LoginScreen);
