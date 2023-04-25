import CustomButton from '@components/CustomButton/CustomButton';
import CustomInput from '@components/CustomInput/CustomInput';
import CustomText from '@components/CustomText/CustomText';
import {COLORS} from '@utils/colors';
import {sleep} from '@utils/helpers';
import {Formik} from 'formik';
import {Box, Center, Divider} from 'native-base';
import React from 'react';
import * as Yup from 'yup';
const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};
const formValidation = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Current Password is required.')
    .min(8, 'Password must be atleast 8 character long.'),
  newPassword: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be atleast 8 character long.'),
  confirmPassword: Yup.string().when('password', (password, schema) => {
    return Yup.string()
      .required('Confirm Password is Required')
      .oneOf([Yup.ref('newPassword'), null], 'Password must match.');
  }),
});
const changePassword = async values => {
  await sleep(1000);
  console.log(values);
};

const ChangePasswordScreen = () => {
  return (
    <Box w="100%" h="100%" bg={COLORS.bg}>
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
          {({handleSubmit, isSubmitting}) => (
            <>
              <CustomInput
                name="currentPassword"
                label="Current Password"
                type="password"
                inputProps={{
                  placeholder: 'Current Password',
                }}
              />
              <Divider my={4} bg="rgba(0,0,0,0.05)" />

              <CustomText fontSize="xs" mb={2} color={COLORS.muted}>
                Password should be at least 8 characters and must contain
                Alphabets, Numbers and Special Characters
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
    </Box>
  );
};

export default ChangePasswordScreen;
