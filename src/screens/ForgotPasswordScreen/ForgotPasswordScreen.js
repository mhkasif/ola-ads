import CustomButton from '@components/CustomButton/CustomButton';
import CustomInput from '@components/CustomInput/CustomInput';
import YUP from '@components/YUP/YUP';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '@utils/colors';
import { sleep } from '@utils/helpers';
import { Formik } from 'formik';
import { Box } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import { passwordResetEmailAction } from 'redux/authSlice/authActions';
const initialState = {
  email: '',
};
const formValidationSchema = YUP.object().shape({
  email: YUP.string().email('Invalid email').required('Required'),
});
const ForgotPasswordScreen = ({passwordResetEmailAction}) => {
  // const [inputValue, setInputValue] = React.useState('');
  // const [isCodeSent, setIsCodeSent] = React.useState(false);
  const {goBack} = useNavigation();
  // const handleInputValueChange = value => {
  //   if (value.length > 6) return;
  //   setInputValue(value);
  // };
  const handleCodeSent = async value => {
    const {data, error} = await passwordResetEmailAction(value.email);
    if (data) {
      await sleep(1000);
      goBack();
    }
    // setIsCodeSent(true);
  };
  const submitCode = async () => {
    // await sleep(1000);
    // navigate(SCREEN_NAMES.MAIN);
  };
  return (
    <Box px={6} pt={10} bg={COLORS.white} w="100%" h="100%">
      <Formik
        onSubmit={handleCodeSent}
        initialValues={initialState}
        validationSchema={formValidationSchema}>
        {({handleSubmit, isSubmitting}) => (
          <Box>
            <CustomInput
              isRequired
              name="email"
              label="Email Address"
              type="email"
              inputProps={{
                placeholder: 'Enter your email address',
                keyboardType: 'email-address',
              }}
            />
            {/* <FormControl isRequired>
        <FormControl.Label>Verification Code</FormControl.Label> */}
            {/* <SimpleInput
          disabled={!isCodeSent}
          value={inputValue}
          onChangeText={handleInputValueChange}
          maxLength={6}
          rightElement={
            <CustomText
              onPress={isCodeSent ? null : handleCodeSent}
              color={isCodeSent ? COLORS.muted : COLORS.prim}
              mx={4}
              bold>
              Get Code
            </CustomText>
          }
        />
        <FormControl.HelperText>
          Enter the 6-digit code sent to your email address
        </FormControl.HelperText> */}
            <CustomButton
              mt={8}
              buttonProps={{
                onPress: handleSubmit,
                isLoading: isSubmitting,
                isLoadingText: 'Submitting...',
              }}
              // disabled={inputValue.length < 6}
            >
              Submit
            </CustomButton>
          </Box>
        )}
      </Formik>
      {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        Atleast 6 characters are required.
      </FormControl.ErrorMessage> */}
      {/* </FormControl> */}
    </Box>
  );
};
const actions = {
  passwordResetEmailAction,
};
export default connect(null, actions)(ForgotPasswordScreen);
