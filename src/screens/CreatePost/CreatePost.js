/* eslint-disable react-hooks/exhaustive-deps */
import CustomButton from '@components/CustomButton/CustomButton';
import CustomInput, {SimpleTextArea} from '@components/CustomInput/CustomInput';
import CustomText from '@components/CustomText/CustomText';
import ImagePicker from '@components/ImagePicker/ImagePicker';
import MaterialIcon from '@components/MaterialIcon/MaterialIcon';
import {FlashList} from '@shopify/flash-list';
import {COLORS} from '@utils/colors';
import {sleep} from '@utils/helpers';
import Picture from 'assets/picture.png';
import Video from 'assets/video.png';
import {Formik} from 'formik';
import {
  Avatar,
  Box,
  Center,
  Checkbox,
  HStack,
  Icon,
  Image,
  Modal,
  Pressable,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {connect, useSelector} from 'react-redux';
import {createAdAction} from 'redux/adsActions/adsActions';
import FormData from 'form-data';
const MODAL_NAMES = {
  IMAGE_ACTION_SHEET: 'IMAGE_ACTION_SHEET',
  CONTACT_MODAL: 'CONTACT_MODAL',
};
function CreatePost({user, authToken, navigation, createAdAction}) {
  const [openModal, setOpenModal] = React.useState(false);
  const [state, setState] = useState({
    categories: [],
    description: '',
    name: user?.fullName,
    phoneNumber: '',
    isLoading: false,
  });
  const [image, setImage] = useState(null);
  const fields = [
    {
      my: 2,

      bg: 'white',
      name: 'description',
      // label: 'Description',
      type: 'textarea',
      inputProps: {
        borderWidth: 0,
        placeholder: 'Enter your ad description',
        h: 120,
        value: state.description,
        onChangeText: value => handleChange(value, 'description'),
      },
    },
  ];

  const handleChange = (value, name) => {
    setState({...state, [name]: value});
  };
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };
  const handleImageSelect = async images => {
    console.log(images[0]);
    setImage(images[0]);
    console.log({image})
    onClose();
  };

  const onClose = () => setOpenModal('');
  const onOpen = name => () => setOpenModal(name);

  const handleSubmitData = async () => {
    const {description, categories} = state;
    console.log({image});
    const formData = new FormData();
    formData.append('description', description);
    // formData.append('categories', categories);
    formData.append('file', {...image, name: image.fileName});
    setState({...state, isLoading: true});
    // const formData = {
    //   description,
    //   categories,
    //   media: image,
    // }

    await createAdAction(formData);
    // fetch(`http://10.0.2.2:3000/api/v1/user/create-ad`, {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //     Accept: 'application/json',
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   body: formData,
    // })
    //   .then(res => res.json())
    //   .then(json => {
    //     // dispatch({type: 'ORDER', payload: response.data});
    //     console.log('json1', json);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    setState({...state, isLoading: false});
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          textProps={{
            bold: true,
          }}
          px={3}
          buttonProps={{
            isDisabled: !state.description,
            onPress: handleSubmitData,
            isLoading: state.isLoading,
          }}
          bg={
            state.isLoading || !state.description || !image
              ? COLORS.muted
              : 'success.600'
          }>
          Post
        </CustomButton>
      ),
    });
  }, [state.description, state.isLoading, image]);
  return (
    <>
      <Box pt={5} px={4}>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
          accentColor="red"
        />
        <Box h="45%">
          <VStack>
            {fields.map((field, index) => (
              <SimpleTextArea key={index} {...field} />
            ))}
          </VStack>

          <HStack space={3}>
            {[
              {
                image: Picture,
                title: 'Photo',
                onPress: onOpen(MODAL_NAMES.IMAGE_ACTION_SHEET),
              },
              {image: Video, title: 'Video'},
            ].map((item, index) => (
              <MediaItem key={index} {...item} />
            ))}
          </HStack>
          <HStack space="4" mt={4}>
            {[
              {
                title: 'Contact',
                buttonProps: {
                  onPress: onOpen(MODAL_NAMES.CONTACT_MODAL),
                  leftIcon: (
                    <Icon
                      as={MaterialIcon}
                      size="md"
                      name="call"
                      color={COLORS.white}
                    />
                  ),
                },
              },
              {
                title: 'Schedule Post',
                buttonProps: {
                  onPress: showDatePicker,
                  leftIcon: (
                    <Icon
                      as={MaterialIcon}
                      name="event"
                      size="md"
                      color={COLORS.white}
                    />
                  ),
                },
              },
            ].map((item, index) => (
              <Box flex={1} key={index}>
                <CustomButton {...item}>{item.title}</CustomButton>
              </Box>
            ))}
          </HStack>
        </Box>
      </Box>
      {image && (
        <Box px={4} mt={4}>
          <HStack
            borderStyle="dashed"
            p={1}
            borderWidth={1}
            borderColor={COLORS.muted}
            orderColor>
            <Image
              source={{
                uri: image?.uri,
              }}
              alt="selected Image"
              style={{resizeMode: 'contain'}}
              w={10}
              h={60}
            />
          </HStack>
        </Box>
      )}


      <Box bg="white" flex={1} borderTopRadius={30} mt={5} pb={5}>
        <Center>
          <CustomText fontSize="sm" color={COLORS.muted} my={2}>
            Select Category
          </CustomText>
        </Center>
        <Box my={4} h="85%">
          <CategoryList />
        </Box>
      </Box>
      <ContactModal
        isOpen={openModal === MODAL_NAMES.CONTACT_MODAL}
        onClose={onClose}
      />
      <ImagePicker
        callback={handleImageSelect}
        isOpen={openModal === MODAL_NAMES.IMAGE_ACTION_SHEET}
        onClose={onClose}
      />
    </>
  );
}
const actions = {
  createAdAction,
};
const mapStateToProps = state => {
  return {
    user: state.auth?.user,
    authToken: state.auth?.authToken,
  };
};
export default connect(mapStateToProps, actions)(CreatePost);

const MediaItem = ({image, title, onPress}) => {
  return (
    <Box flex={1} bg="white">
      <Pressable onPress={onPress} pt={5}>
        <VStack>
          <Center>
            <Image
              style={{
                resizeMode: 'contain',
                width: 50,
                height: 50,
              }}
              source={image}
              alt={title}
            />
            <CustomText my={2} mb={3}>
              {title}
            </CustomText>
          </Center>
        </VStack>
      </Pressable>
    </Box>
  );
};
const CategoryItem = ({image, title, onPress, checked}) => {
  return (
    <HStack my={2} alignItems="center" px={6} w="100%">
      <Avatar
        size="sm"
        source={{
          uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        }}
      />
      <CustomText ml={4}>Category {title}</CustomText>
      <Box alignItems="flex-end" flex={1}>
        <Checkbox
          accessibilityLabel="choose numbers"
          colorScheme="primarydark"
          value={title}
          defaultIsChecked={checked}
        />
      </Box>
    </HStack>
  );
};

const CategoryList = () => {
  //flat list for category item

  return (
    <FlashList
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
      renderItem={({item}) => {
        return (
          <CategoryItem key={item} checked={item % 2 === 0} title={item} />
        );
      }}
      estimatedItemSize={25}
    />
  );
};
const ContactModal = ({isOpen = false, onClose = undefined}) => {
  const user = useSelector(state => state.auth?.user);
  const initialValues = {
    name: user?.fullName,
    email: user?.email,
    phone: '',
  };
  // const leastDestructiveRef = useRef(null);
  const updateContact = async values => {
    await sleep(1000);
    console.log(values);
  };
  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      // leastDestructiveRef={leastDestructiveRef}
      onClose={onClose}>
      <Formik onSubmit={updateContact} initialValues={{...initialValues}}>
        {({handleSubmit, isSubmitting}) => (
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Contact</Modal.Header>

            <Modal.Body px={6}>
              {[
                {
                  name: 'email',
                  // label: 'Email',
                  type: 'email',
                  inputProps: {
                    placeholder: 'Enter your email',
                  },
                },
                {
                  name: 'phone',
                  // label: 'Phone Number',
                  type: 'tel',
                  inputProps: {
                    placeholder: 'Enter your phone number',
                  },
                },
              ].map((field, index) => (
                <CustomInput key={index} {...field} />
              ))}
              <HStack justifyContent="space-between" mt={5}>
                <CustomButton
                  textProps={{color: COLORS.primaryDark, bold: true}}
                  noGradient
                  buttonProps={{
                    disabled: isSubmitting,
                    w: '47%',
                    bg: COLORS.lightColor,
                    _pressed: {
                      bg: COLORS.lightColor,
                    },
                    // variant: 'ghost',
                    // colorScheme: '',
                    onPress: onClose,
                  }}>
                  No
                </CustomButton>
                <CustomButton
                  textProps={{color: COLORS.white, bold: true}}
                  buttonProps={{
                    // _loading: {
                    //   bg: COLORS.primary,
                    // },
                    isLoading: isSubmitting,
                    isLoadingText: 'Submitting...',
                    // bg: COLORS.danger,
                    colorScheme: 'primarydark',
                    onPress: handleSubmit,
                    w: '47%',
                  }}
                  noGradient>
                  Yes, I'm Sure
                </CustomButton>
              </HStack>
            </Modal.Body>
            {/* <Modal.Footer> */}
            {/* </Modal.Footer> */}
          </Modal.Content>
        )}
      </Formik>
    </Modal>
  );
};
