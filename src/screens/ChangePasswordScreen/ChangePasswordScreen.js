import CustomButton from '@components/CustomButton/CustomButton';
import CustomInput from '@components/CustomInput/CustomInput';
import CustomText from '@components/CustomText/CustomText';
import KeyboardAvoidingInputWrapper from '@components/KeyboardAvoidingInputWrapper/KeyboardAvoidingInputWrapper';
import YUP from '@components/YUP/YUP';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '@utils/colors';
import { Formik } from 'formik';
import { Box, Divider } from 'native-base';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import { updatePasswordAction } from 'redux/authSlice/authActions';
const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};
const formValidation = YUP.object().shape({
  currentPassword: YUP.string()
    .required('Current Password is required.')
    .min(8, 'Password must be atleast 8 character long.'),
  newPassword: YUP.string()
    .required('Password is required')
    .min(8, 'Password must be atleast 8 character long.'),
  confirmPassword: YUP.string().when('password', (password, schema) => {
    return YUP.string()
      .required('Confirm Password is Required')
      .oneOf([YUP.ref('newPassword'), null], 'Password must match.');
  }),
});

const ChangePasswordScreen = ({updatePasswordAction}) => {
  const {goBack} = useNavigation();
  const [oldPasswordVerified, setOldPasswordVerified] = useState({
    verified: false,
    touched: false,
  });
  const changePassword = async (values, {resetForm}) => {
    const {currentPassword, newPassword} = values;
    setOldPasswordVerified({
      verified: false,
      touched: false,
    });

    try {
      const {error, data} = await updatePasswordAction({
        currentPassword,
        newPassword,
      });
      console.log({error, data});
      if (error) {
        if (error?.code === 'auth/wrong-password') {
          setOldPasswordVerified({
            verified: false,
            touched: true,
            messsage: error?.message || 'Wrong password',
          });
          return;
        }
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error?.message || 'Something went wrong',
        });
      }
      resetForm?.();
      setOldPasswordVerified({
        verified: false,
        touched: false,
      });
      Toast.show({
        type: 'success',
        text1: 'Password Changed',
        text2: 'Your password has been changed successfully',
      });

      goBack();
    } catch (err) {
      console.log({err});
    }
  };
  return (
    <Box w="100%" h="100%" bg={COLORS.bg}>
      <KeyboardAvoidingInputWrapper>
      <Box mx={6} mt={10}>
        {/* <Center mb={2}> */}
        <CustomText w="75%" fontSize="xs" mb={4} color={COLORS.muted}>
          Your password must be different from previous used password{' '}
        </CustomText>
        {/* </Center> */}
        <Formik
          initialValues={initialValues}
          validationSchema={formValidation}
          onSubmit={changePassword}>
          {({handleSubmit, isSubmitting, errors}) => (
            <>
              <CustomInput
                name="currentPassword"
                label="Current Password"
                type="password"
                inputProps={{
                  placeholder: 'Current Password',
                }}
              />
              {!oldPasswordVerified.verified &&
                oldPasswordVerified.touched &&
                !errors?.currentPassword && (
                  <CustomText color={COLORS.danger} mt={1}>
                    {oldPasswordVerified.messsage}
                  </CustomText>
                )}
              <Divider my={4} bg="rgba(0,0,0,0.05)" />

              <CustomText fontSize="xs" mb={2} color={COLORS.muted}>
                Password should be at least 8 characters long.
              </CustomText>
              <CustomInput
                name="newPassword"
                type="password"
                label="New Password"
                inputProps={{
                  placeholder: 'New Password',
                }}
              />
              <CustomInput
                mt={2}
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                inputProps={{
                  placeholder: 'Confirm Password',
                }}
              />
              <CustomButton
                mt={8}
                buttonProps={{
                  onPress: handleSubmit,
                  isLoading: isSubmitting,
                  isLoadingText: 'Changing Password...',
                }}>
                Change Password
              </CustomButton>
            </>
          )}
        </Formik>
      </Box>
      </KeyboardAvoidingInputWrapper>
    </Box>
  );
};
const actions = {
  updatePasswordAction,
};
export default connect(null, actions)(ChangePasswordScreen);
