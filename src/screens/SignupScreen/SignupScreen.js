import AppleButton from '@components/AppleButton/AppleButton';
import CustomButton from '@components/CustomButton/CustomButton';
import CustomInput from '@components/CustomInput/CustomInput';
import CustomText from '@components/CustomText/CustomText';
import FacebookButton from '@components/FacebookButton/FacebookButton';
import FullScreenLoader from '@components/FullScreenLoader/FullScreenLoader';
import GoogleButton from '@components/GoogleButton/GoogleButton';
import KeyboardAvoidingInputWrapper from '@components/KeyboardAvoidingInputWrapper/KeyboardAvoidingInputWrapper';
import YUP from '@components/YUP/YUP';
import {StackActions, useNavigation} from '@react-navigation/native';
import {COLORS, linearGradient} from '@utils/colors';
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
import {useState} from 'react';
import {Platform} from 'react-native';
import {connect} from 'react-redux';
import {signupAction} from 'redux/authSlice/authActions';
import {SCREEN_NAMES} from '../screenNames';
import CustomCheckbox from '@components/CustomCheckbox/CustomCheckbox';
const formValidation = YUP.object().shape({
  email: YUP.string().email('Email is invalid').required('Email is required.'),
  fullName: YUP.string().required('Full name is required.'),
  password: YUP.string()
    .required('Password is required')
    .min(8, 'Password must be atleast 8 character long.'),
  acceptTerms: YUP.boolean()
    .required()
    .oneOf([true], 'Accept Terms is required'),
});
const SignupScreen = ({signupAction}) => {
  const {navigate, ...navigation} = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [fields] = useState([
    {
      name: 'fullName',
      label: 'Name',
      // type: 'text',
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
    {
      name: 'acceptTerms',
      label: (
        <>
          <CustomText>Accept </CustomText>
          <CustomText
            underline
            onPress={() => navigate(SCREEN_NAMES.Terms)}
            fontWeight="medium">
            Terms and Conditions
          </CustomText>
        </>
      ),
      type: 'checkbox',
      validate: true,
    },
  ]);
  const initialValues = fields.reduce((acc, field) => {
    if (field.name === 'fullName') acc[field.name] = '';
    if (field.name === 'email') acc[field.name] = '';
    if (field.name === 'password') acc[field.name] = '';
    if (field.name === 'acceptTerms') acc[field.name] = false;
    return acc;
  }, {});

  const handleSignup = async values => {
    try {
      let {error, data} = await signupAction(values);
      console.log({error, data});
      if (!error) {
        const resetAction = StackActions.replace(
          data.user.isNew ? SCREEN_NAMES.ONBOARDING : SCREEN_NAMES.MAIN,
        );

        navigation.dispatch(resetAction);
      }
    } catch (error) {
      console.log({error});
    }
    // navigate(SCREEN_NAMES.MAIN);
    // navigate(SCREEN_NAMES.OTP)
  };
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
                Sign Up to continue!
              </Heading>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSignup}
                validationSchema={formValidation}>
                {({isSubmitting, handleSubmit}) => (
                  <VStack space={3} mt="5">
                    {fields.map(field =>
                      field.type === 'checkbox' ? (
                        <CustomCheckbox {...field} key={field.name} />
                      ) : (
                        <CustomInput {...field} key={field.name} />
                      ),
                    )}

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
                  Log In
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
                  <AppleButton
                    type="signup"
                    w="100%"
                    setIsLoading={setIsLoading}
                  />
                </Box>
              )}
              <HStack space={3} justifyContent="center">
                <FacebookButton
                  type="signup"
                  w="45%"
                  setIsLoading={setIsLoading}
                />
                <GoogleButton
                  type="signup"
                  w="45%"
                  setIsLoading={setIsLoading}
                />
              </HStack>
            </Box>
          </Center>
        </KeyboardAvoidingInputWrapper>
      </Box>
    </Box>
  );
};
const actions = {
  signupAction,
};
export default connect(null, actions)(SignupScreen);
