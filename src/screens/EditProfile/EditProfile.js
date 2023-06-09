import CustomButton from '@components/CustomButton/CustomButton';
import CustomInput from '@components/CustomInput/CustomInput';
import ImagePicker from '@components/ImagePicker/ImagePicker';
import MaterialIcon from '@components/MaterialIcon/MaterialIcon';
import YUP from '@components/YUP/YUP';
import {COLORS} from '@utils/colors';
import FormData from 'form-data';
import {Formik} from 'formik';
import {Avatar, Box, Center, Icon, Pressable, ScrollView, VStack} from 'native-base';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {updateProfileAction} from 'redux/authSlice/authActions';

import {useNavigation} from '@react-navigation/native';
import {IMAGE_DIRECTORY} from '@utils/Urls';

const MODAL_NAMES = {
  IMAGE_ACTION_SHEET: 'IMAGE_ACTION_SHEET',
};

const fields = [
  {
    name: 'fullName',
    label: 'Name',
    validate: true,
    inputProps: {
      placeholder: 'Enter your Full name',
    },
  },
  // {
  //   name: 'email',
  //   label: 'Email',
  //   type: 'email',
  //   validate: true,
  //   inputProps: {
  //     placeholder: 'Enter your email',
  //   },
  // },
];
const formValidation = YUP.object().shape({
  fullName: YUP.string().required('Name is required'),
  // email: YUP.string()
  //   .email('Please enter a valid email address')
  //   .required('Email address is required'),
});

const EditProfile = ({user, updateProfileAction}) => {
  const [modalOpen, setModalOpen] = useState('');
  const {goBack} = useNavigation();
  const [image, setImage] = useState(null);
  const initialValues = {
    fullName: user?.fullName,
    // email: user?.email,
  };
  const onClose = () => {
    setModalOpen('');
  };
  const openModal = name => () => {
    setModalOpen(name);
  };
  const updateProfile = async values => {
    // console.log(values);
    const fromData = new FormData();
    Object.keys(values).forEach(key => {
      fromData.append(key, values[key]);
    });
    if (image) {
      fromData.append('profile_photo', {...image, name: image.fileName});
    }
    const {data, error} = await updateProfileAction(fromData);
    if (data) goBack();
  };
  const onImageSelect = async image => {
    console.log(image);
    setImage(image[0]);
    onClose();
  };
  return (
    <ScrollView>
      <Center>
        <VStack mt={5} w="90%">
          <Center>
            <Pressable
              width={0}
              onPress={openModal(MODAL_NAMES.IMAGE_ACTION_SHEET)}>
              <Center>
                <Avatar
                  size="2xl"
                  source={{
                    uri:
                      image?.uri ||
                      (user?.photo && IMAGE_DIRECTORY + user.photo) ||
                      'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
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
                    <Pressable
                      onPress={openModal(MODAL_NAMES.IMAGE_ACTION_SHEET)}>
                      <Icon
                        size={4}
                        as={<MaterialIcon name="edit" />}
                        color={COLORS.white}
                      />
                    </Pressable>
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
                        isDisabled:
                          !(dirty && JSON.stringify(errors) === '{}') && !image,

                        isLoading: isSubmitting,
                        onPress: handleSubmit,
                        isLoadingText: 'Updating...',
                      }}
                      mt={4}>
                      Update
                    </CustomButton>
                  </Box>
                );
              }}
            </Formik>
          }
        </VStack>
      </Center>
      <ImagePicker
        isOpen={modalOpen === MODAL_NAMES.IMAGE_ACTION_SHEET}
        onClose={onClose}
        callback={onImageSelect}
        mediaType="photo"
      />
    </ScrollView>
  );
};
const actions = {
  updateProfileAction,
};
const mapStateToProps = state => ({
  user: state.auth?.user,
});
export default connect(mapStateToProps, actions)(EditProfile);
