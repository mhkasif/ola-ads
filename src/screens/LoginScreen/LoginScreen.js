import {Formik} from 'formik';
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Link,
  VStack,
} from 'native-base';
import {Text, View} from 'react-native';
import * as Yup from 'yup';
import CustomInput from '@components/CustomInput/CustomInput';
import {sleep} from '../../utils/helpers';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from '../screenNames';
import {connect} from 'react-redux';
import {loginAction} from 'redux/authSlice/authActions';

const formValidation = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
const initialValues = {
  email: '',
  password: '',
};
const LoginScreen = ({loginAction}) => {
  const {navigate} = useNavigation();
  const handleLogin = async values => {
    console.log({values});
    try {
      await loginAction(values);
      navigate(SCREEN_NAMES.LIST_OF_GROUPS);

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
      placeholder: 'Enter your email',
      validate: true,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      validate: true,
    },
  ];
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleLogin}
      validationSchema={formValidation}>
      {({isSubmitting, handleSubmit}) => (
        <Center w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
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
              Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
              {fields.map(field => (
                <CustomInput  {...field} key={field.name} />
              ))}
              <Link
                _text={{
                  fontSize: 'xs',
                  fontWeight: '500',
                  color: 'indigo.500',
                }}
                alignSelf="flex-end"
                mt="1">
                Forget Password?
              </Link>
              <Button
                mt="2"
                colorScheme="indigo"
                onPress={handleSubmit}
                isLoading={isSubmitting}
                isLoadingText="Logging...">
                Login
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  I'm a new user.{' '}
                </Text>
                <Link
                  _text={{
                    color: 'indigo.500',
                    fontWeight: 'medium',
                    fontSize: 'sm',
                  }}
                  href="#">
                  Sign Up
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      )}
    </Formik>
    // <Formik
    //   onSubmit={handleSubmit}
    //   initialValues={initialValues}
    //   validationSchema={formValidation}>
    //   {() => (
    //     <Form>
    //       <CustomInput
    //         name="email"
    //         label="Email"
    //         placeholder="Enter E-mail address"
    //         w="100%"
    //       />
    //       <CustomInput
    //         w="100%"
    //         name="password"
    //         label="Password"
    //         placeholder="Enter Password"
    //       />
    //     </Form>
    //   )}
    // </Formik>
  );
};
const actions = {
  loginAction,
};
export default connect(null, actions)(LoginScreen);
