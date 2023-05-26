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
import FormData from 'form-data';
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
import {createAdAction, getCategoriesAction} from 'redux/adsActions/adsActions';
import {useNavigation} from '@react-navigation/native';

const MODAL_NAMES = {
  IMAGE_ACTION_SHEET: 'IMAGE_ACTION_SHEET',
  CONTACT_MODAL: 'CONTACT_MODAL',
};
function CreatePost({
  user,
  authToken,
  navigation,
  createAdAction,
  getCategoriesAction,
}) {
  const [openModal, setOpenModal] = React.useState(false);
  const [mediaType, setMediaType] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const {goBack} = useNavigation();
  const [state, setState] = useState({
    description: '',
    name: user?.fullName,
    phoneNumber: '',
    isLoading: false,
    schedule_date: '',
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
  const handleSelectCategory = async id => {
    console.log({id});
    if (selectedCategories.includes(id)) {
      setSelectedCategories(p => p.filter(item => item !== id));
    } else {
      setSelectedCategories(p => [...p, id]);
    }
  };
  const handleChange = (value, name) => {
    setState(p => ({...p, [name]: value}));
  };
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleImageSelect = async images => {
    console.log(images[0]);
    setImage(images[0]);
    console.log({image});
    onClose();
  };

  const onClose = () => setOpenModal('');
  const onOpen = (name, type) => () => {
    if (name === MODAL_NAMES.IMAGE_ACTION_SHEET && type) {
      setMediaType(type);
    }
    setOpenModal(name);
  };

  const handleSubmitData = async () => {
    console.log(state, selectedCategories);
    const formData = new FormData();
    if (selectedCategories.length) {
      selectedCategories.forEach((item,i) => {
      formData.append(`categories[]`,item);
      });
    }
    if (state.schedule_date)
      formData.append('schedule_date',new Date( state.schedule_date).toISOString());

    formData.append('description', state.description);
    formData.append('file', {...image, name: image.fileName});
    setState(p => ({...p, isLoading: true}));

    const {data, error} = await createAdAction(formData);
    if (data) goBack();

    setState(p => ({...p, isLoading: false}));
  };
  const handleSelectDate = async date => {
    console.log({date});
    setState(p => ({...p, schedule_date: date}));
    hideDatePicker();
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
            isDisabled: !state.description.trim() || !image,
            onPress: handleSubmitData,
            isLoading: state.isLoading,
          }}
          bg={
            state.isLoading || !state.description.trim() || !image
              ? COLORS.muted
              : 'success.700'
          }>
          Post
        </CustomButton>
      ),
    });
  }, [
    state.description,
    state.isLoading,
    image,
    selectedCategories,
    state.schedule_date,
  ]);

  const fetchCategories = async () => {
    const d = await getCategoriesAction();
    console.log({d});
    if (d) setCategoriesList(d);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Box pt={5} px={4}>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          date={
            state.schedule_date ? new Date(state.schedule_date) : new Date()
          }
          onConfirm={handleSelectDate}
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
                onPress: onOpen(MODAL_NAMES.IMAGE_ACTION_SHEET, 'photo'),
              },
              {
                image: Video,
                title: 'Video',
                onPress: onOpen(MODAL_NAMES.IMAGE_ACTION_SHEET, 'video'),
              },
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
          <CategoryList
            handleSelectCategory={handleSelectCategory}
            categories={categoriesList}
          />
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
        mediaType={mediaType}
      />
    </>
  );
}
const actions = {
  createAdAction,
  getCategoriesAction,
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
const CategoryItem = item => {
  const [isChecked, setIsChecked] = useState(false);
  const onCheck = e => {
    e?.stopPropagation?.();
    setIsChecked(p => !p);
    handleSelectCategory(_id);
  };
  const {handleSelectCategory, name, _id} = item || {};
  return (
    <Pressable onPress={onCheck}>
      <HStack my={2} alignItems="center" px={6} w="100%">
        <Avatar
          size="sm"
          source={{
            uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}
        />
        <CustomText ml={4}>{name}</CustomText>
        <Box alignItems="flex-end" flex={1}>
          <Checkbox
            accessibilityLabel="choose numbers"
            colorScheme="primarydark"
            value={_id}
            isChecked={isChecked}
            onChange={onCheck}
          />
        </Box>
      </HStack>
    </Pressable>
  );
};

const CategoryList = ({handleSelectCategory, categories}) => {
  //flat list for category item

  return (
    <FlashList
      data={categories || []}
      renderItem={({item}) => {
        return (
          <CategoryItem
            handleSelectCategory={handleSelectCategory}
            key={item._id}
            {...item}
          />
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
