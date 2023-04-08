import CustomInput from '@components/CustomInput/CustomInput';
import {Formik} from 'formik';
import {Text} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {Box, Button, Center, HStack, Heading, Link, VStack} from 'native-base';
import {connect} from 'react-redux';
import {loginAction} from 'redux/authSlice/authActions';
import * as Yup from 'yup';
import {SCREEN_NAMES} from '../screenNames';
const formValidation = Yup.object().shape({
  userName: Yup.string().required('Username is required.'),
  email: Yup.string().email('Email is invalid').required('Email is required.'),
  fullName: Yup.string().required('Full name is required.'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be atleast 8 character long.'),
  confirmPassword: Yup.string().when('password', () => {
    return Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Password must match.');
  }),
});
const fields = [
  {
    name: 'userName',
    label: 'Username',
    placeholder: 'Enter your username',
    type: 'text',
    validate: true,
  },
  {
    name: 'fullName',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
    validate: true,
  },
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
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Enter your password again',
    validate: true,
  },
];
const SignupScreen = ({loginAction}) => {
  const {navigate} = useNavigation();
  const handleSignup = async values => {
    console.log({values});
    try {
      await loginAction(values);
      navigate(SCREEN_NAMES.SIGNUP);

      return;
    } catch (error) {
      console.error({error});
    }
  };
  return (
    <Formik
      initialValues={fields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
      })}
      onSubmit={handleSignup}
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
                <CustomInput {...field} key={field.name} />
              ))}

              <Button
                mt="2"
                colorScheme="indigo"
                onPress={handleSubmit}
                isLoading={isSubmitting}
                isLoadingText="Signing up...">
                Sign up
              </Button>
            </VStack>
          </Box>
        </Center>
      )}
    </Formik>
  );
};
const actions = {
  loginAction,
};
export default connect(null, actions)(SignupScreen);
