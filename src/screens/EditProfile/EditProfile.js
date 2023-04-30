import CustomButton from '@components/CustomButton/CustomButton';
import CustomInput from '@components/CustomInput/CustomInput';
import MaterialIcon from '@components/MaterialIcon/MaterialIcon';
import YUP from '@components/YUP/YUP';
import {COLORS} from '@utils/colors';
import {sleep} from '@utils/helpers';
import {Formik} from 'formik';
import {
  Actionsheet,
  Avatar,
  Box,
  Center,
  Icon,
  Pressable,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {connect} from 'react-redux';

const ImageActionSheet = ({isOpen, onClose}) => {
  const handleLibraryOpen = async () => {
    try {
      const x = await launchImageLibrary();
      console.log(x);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        {/* <Box w="100%" h={60} px={4} justifyContent="center">
      <CustomText fontSize="16" color="gray.500" _dark={{
      color: "gray.300"
    }}>
        Albums
      </CustomText>
    </Box> */}
        <Actionsheet.Item onPress={handleLibraryOpen}>
          Choose From Library
        </Actionsheet.Item>
        <Actionsheet.Item onPress={onClose}>Cancel</Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
const MODAL_NAMES = {
  IMAGE_ACTION_SHEET: 'IMAGE_ACTION_SHEET',
};

const fields = [
  {
    name: 'name',
    label: 'Name',
    validate: true,
    inputProps: {
      placeholder: 'Enter your Full name',
    },
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    validate: true,
    inputProps: {
      placeholder: 'Enter your email',
    },
  },
];
const formValidation = YUP.object().shape({
  name: YUP.string().required('Name is required'),
  email: YUP.string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
});

const EditProfile = ({user}) => {
  const [modalOpen, setModalOpen] = useState('');
  const initialValues = {
    name: user?.name,
    email: user?.email,
  };
  const onClose = () => {
    setModalOpen('');
  };
  const openModal = name => () => {
    setModalOpen(name);
  };
  const updateProfile = async values => {
    // console.log(values);
    await sleep(1000);
  };
  return (
    <>
      <Center>
        <VStack mt={5} w="90%">
          <Center>
            <Pressable
              width={0}
              onPress={openModal(MODAL_NAMES.IMAGE_ACTION_SHEET)}
              bg="red.400">
              <Center>
                <Avatar
                  size="2xl"
                  source={{
                    uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                  }}
                  // borderColor={COLORS.primary}
                  // borderWidth={2}
                  alt="Profile Picture"
                  mb={3}>
                  <Avatar.Badge
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                    bg={COLORS.primary}>
                    <Icon
                      size={4}
                      as={<MaterialIcon name="edit" />}
                      color={COLORS.white}
                    />
                  </Avatar.Badge>
                </Avatar>
              </Center>
            </Pressable>
          </Center>
          {
            <Formik
              initialValues={initialValues}
              validationSchema={formValidation}
              onSubmit={updateProfile}>
              {({handleSubmit, errors, dirty, isSubmitting}) => {
                return (
                  <Box>
                    {fields.map(x => (
                      <CustomInput key={x.name} my={2} {...x} />
                    ))}
                    <CustomButton
                      buttonProps={{
                        isDisabled: !(dirty && JSON.stringify(errors) === '{}'),

                        isLoading: isSubmitting,
                        onPress:handleSubmit,
                        isLoadingText: 'Updating...',
                      }}
                      mt={4}
                      >
                      Update
                    </CustomButton>
                  </Box>
                );
              }}
            </Formik>
          }
        </VStack>
      </Center>
      <ImageActionSheet
        isOpen={modalOpen === MODAL_NAMES.IMAGE_ACTION_SHEET}
        onClose={onClose}
      />
    </>
  );
};
const mapStateToProps = state => ({
  user: state.auth?.user,
});
export default connect(mapStateToProps)(EditProfile);
