import {Formik} from 'formik';
import {Button} from 'native-base';
import {Text, View} from 'react-native';
import * as Yup from 'yup';
import CustomInput from '@components/CustomInput/CustomInput';
import {sleep} from '../utils/helpers';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from './screenNames';
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
      navigate(SCREEN_NAMES.SIGNUP);

      return;
    } catch (error) {
      console.error({error});
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleLogin}
      validationSchema={formValidation}>
      {({isSubmitting, handleSubmit}) => (
        <View>
          <CustomInput name="email" label="Email" />
          <CustomInput name="password" label="Password" secureTextEntry />
          <Button
            onPress={handleSubmit}
            isLoading={isSubmitting}
            isLoadingText="Logging...">
            <Text>Login</Text>
          </Button>
        </View>
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
