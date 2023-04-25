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
import * as Yup from 'yup';
import {SCREEN_NAMES} from '../screenNames';

const formValidation = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required.'),
  fullName: Yup.string().required('Full name is required.'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be atleast 8 character long.'),
});
const fields = [
  {
    name: 'fullName',
    label: 'Full Name',
    type: 'text',
    inputProps: {
      placeholder: 'Enter your full name',
    },
    validate: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    inputProps: {
      placeholder: 'Enter your email',
    },
    validate: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    inputProps: {
      placeholder: 'Enter your password',
    },
    validate: true,
  },
];
const SignupScreen = ({loginAction}) => {
  const {navigate} = useNavigation();
  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  });
  const handleLogin = async values => {
    console.log({values});
    try {
      await loginAction(values);
      navigate(SCREEN_NAMES.MAIN);

      return;
    } catch (error) {
      console.error({error});
    }
  };
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
          linearGradient: {
            colors: ['#72439A', '#13C2EE'],
            start: [0, 0],
            end: [1, 1],
            locations: [0.1747, 1.461],
          },
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
              Sign Up to continue!
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

                  <CustomButton
                    buttonProps={{
                      // colorScheme: 'indigo',
                      onPress: handleSubmit,
                      isLoading: isSubmitting,
                      isLoadingText: 'Creating...',
                    }}>
                    Create Account
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
                Already have an account?{' '}
              </CustomText>
              <Link
                _text={{
                  color: COLORS.primary,
                  fontWeight: 'medium',
                  fontSize: 'sm',
                  underline: false,
                }}
                onPress={() => navigate(SCREEN_NAMES.LOGIN)}>
                Login
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
export default connect(null, actions)(SignupScreen);
