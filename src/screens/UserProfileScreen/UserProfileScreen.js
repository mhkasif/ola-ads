import CustomButton from '@components/CustomButton/CustomButton';
import CustomInput from '@components/CustomInput/CustomInput';
import {sleep} from '@utils/helpers';
import {Formik} from 'formik';
import {Box, Center, VStack} from 'native-base';
import React from 'react';
import * as Yup from 'yup';
const fields = [
  {name: 'userName', label: 'Username', validate: true},
  {name: 'fullName', label: 'Full Name', validate: true},
  {name: 'email', label: 'Email', validate: true, type: 'email'},
  {name: 'phoneNumber', label: 'Phone Number', validate: true, type: 'number'},
];
const initialValues = fields.reduce((acc, field) => {
  acc[field.name] = '';
  return acc;
}, {});
const formValidation = Yup.object().shape({
  userName: Yup.string().required('Username is required.'),
  email: Yup.string().email('Email is invalid').required('Email is required.'),
  fullName: Yup.string().required('Full name is required.'),
  phoneNumber: Yup.number('Phone number must be a number').required(
    'Phone number is required.',
  ),
});
const UserProfile = () => {
  const submitProfile = async () => {
    await sleep(1000);
    return;
  };

  return (
    <Center w="100%" h="80%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Formik
          validationSchema={formValidation}
          onSubmit={submitProfile}
          initialValues={initialValues}>
          {({isSubmitting, handleSubmit}) => (
            <Box>
              <VStack space={3}>
                {fields.map(field => (
                  <CustomInput key={field.name} {...field} />
                ))}
                <CustomButton
                  mt={5}
                  isLoading={isSubmitting}
                  onPress={handleSubmit}
                  isLoadingText="Saving...">
                  Save
                </CustomButton>
              </VStack>
            </Box>
          )}
        </Formik>
      </Box>
    </Center>
  );
};

export default UserProfile;
