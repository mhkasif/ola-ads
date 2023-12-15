/* eslint-disable react-hooks/exhaustive-deps */
import CustomButton from '@components/CustomButton/CustomButton';
import CustomInput, {SimpleTextArea} from '@components/CustomInput/CustomInput';
import CustomText from '@components/CustomText/CustomText';
import ImagePicker from '@components/ImagePicker/ImagePicker';
import MaterialIcon from '@components/MaterialIcon/MaterialIcon';
// import { FlashList } from '@shopify/flash-list';
import KeyboardAvoidingInputWrapper from '@components/KeyboardAvoidingInputWrapper/KeyboardAvoidingInputWrapper';
import {CategoriesSkeleton} from '@components/Skeletons/Skeleton';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '@utils/colors';
import {sleep} from '@utils/helpers';
import Picture from 'assets/picture.png';
import Video from 'assets/video.png';
import FormData from 'form-data';
import {Formik} from 'formik';
// import {Calendar} from 'react-native-calendars';
// import Calendar from 'react-native-calendars-range';

import CalendarPicker from 'react-native-calendar-picker';

import {
  Avatar,
  Badge,
  Box,
  Center,
  Checkbox,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Modal,
  Pressable,
  Spinner,
  VStack,
} from 'native-base';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Dimensions, FlatList, View, StyleSheet, Platform} from 'react-native';
import ImageView from 'react-native-image-viewing';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {connect, useDispatch} from 'react-redux';
import {
  createAdAction,
  getCategoriesAction,
  getDaysAction,
} from 'redux/adsActions/adsActions';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';

const MODAL_NAMES = {
  IMAGE_ACTION_SHEET: 'IMAGE_ACTION_SHEET',
  CONTACT_MODAL: 'CONTACT_MODAL',
  VIEW_IMAGE: 'VIEW_IMAGE',
  SCHEDULE_MODAL: 'SCHEDULE_MODAL',
};
function CreatePost({
  user,
  authToken,
  navigation,
  createAdAction,
  getCategoriesAction,
}) {
  const [openModal, setOpenModal] = React.useState('');
  const [mediaType, setMediaType] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const {goBack} = useNavigation();
  const [state, setState] = useState({
    description: '',
    isLoading: false,
    schedule_date: '',
    email: user?.email,
    phone: user?.phone || '',
    to: '',
    from: '',
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
  const handleSelectCategory = useCallback(async id => {
    console.log({id});
    setSelectedCategories(p => {
      if (p.includes(id)) {
        return p.filter(item => item !== id);
      }
      return [...p, id];
    });
    // if (selectedCategories.includes(id)) {
    //   setSelectedCategories(p => p.filter(item => item !== id));
    // } else {
    //   setSelectedCategories(p => [...p, id]);
    // }
  }, []);
  const handleChange = useCallback((value, name) => {
    setState(p => ({...p, [name]: value}));
  }, []);
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
    console.log(state, 'state');
    if (selectedCategories.length) {
      selectedCategories.forEach((item, i) => {
        formData.append(`categories[]`, item);
      });
    }
    if (state.schedule_date)
      formData.append('schedule_date', state.schedule_date?._id);
    if (state.to && state.from) {
      formData.append('to', state.to);
      formData.append('from', state.from);
    }

    formData.append('description', state.description);
    formData.append('email', state.email);
    formData.append('phone', state.phone);
    if (image) formData.append('file', {...image, name: image.fileName});
    setState(p => ({...p, isLoading: true}));

    const {data, error} = await createAdAction(formData);
    if (data) goBack();

    setState(p => ({...p, isLoading: false}));
  };
  const handleSelectDate = async ({selectedDay, time, rangeDate}) => {
    try {
      const [h, m, s] = [time.getHours(), time.getMinutes(), time.getSeconds()];

      let to =
        rangeDate.to &&
        format(new Date(rangeDate.to.toDateString()).setHours(h, m, s), 'Pp');
      let from =
        rangeDate.from &&
        format(new Date(rangeDate.from.toDateString()).setHours(h, m, s), 'Pp');
      setState(p => ({...p, schedule_date: selectedDay, to, from}));
    } catch (error) {
      console.log('erorr', error);
    }
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
            isDisabled: !state.description.trim() || !selectedCategories.length,
            onPress: handleSubmitData,
            isLoading: state.isLoading,
          }}
          bg={
            state.isLoading ||
            !state.description.trim() ||
            !selectedCategories.length
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
    setLoadingCategories(true);
    const d = await getCategoriesAction();
    console.log({d});
    setLoadingCategories(false);
    if (d) setCategoriesList(d);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <KeyboardAvoidingInputWrapper>
        <>
          <Box
            pt={5}
            px={4}
            {...(state.isLoading ? {pointerEvents: 'none'} : {})}>
            {MODAL_NAMES.SCHEDULE_MODAL === openModal && (
              <ScheduleModal
                day={state.schedule_date}
                onClose={onClose}
                handleSelectDate={handleSelectDate}
              />
            )}

            <Box h="65%">
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
                      onPress: onOpen(MODAL_NAMES.SCHEDULE_MODAL),

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
        </>
      </KeyboardAvoidingInputWrapper>
      {image && (
        <CustomText
          {...(state.isLoading ? {pointerEvents: 'none'} : {})}
          textAlign="center"
          underline
          color="blue.500"
          mt={3}
          onPress={onOpen(MODAL_NAMES.VIEW_IMAGE)}>
          View File
        </CustomText>
        // <Box px={4} mt={4}>
        //   <HStack
        //     borderStyle="dashed"
        //     p={1}
        //     borderWidth={1}
        //     borderColor={COLORS.muted}
        //     orderColor>
        //     <Image
        //       source={{
        //         uri: image?.uri,
        //       }}
        //       alt="selected Image"
        //       style={{resizeMode: 'contain'}}
        //       w={10}
        //       h={60}
        //     />
        //   </HStack>
        // </Box>
      )}
      <Box
        {...(state.isLoading ? {pointerEvents: 'none'} : {})}
        bg="white"
        flex={1}
        borderTopRadius={30}
        mt={5}
        pb={5}>
        <>
          <Center>
            <CustomText fontSize="sm" color={COLORS.muted} my={2}>
              Select Category
            </CustomText>
          </Center>
          {loadingCategories ? (
            [1, 2, 3, 4, 5, 6].map(x => {
              return <CategoriesSkeleton key={x} />;
            })
          ) : (
            <Box my={4} h="85%">
              <CategoryList
                handleSelectCategory={handleSelectCategory}
                categories={categoriesList}
              />
            </Box>
          )}
        </>
      </Box>
      <Box {...(state.isLoading ? {pointerEvents: 'none'} : {})}>
        <ContactModal
          handleChange={handleChange}
          initialValues={{email: state.email, phone: state.phone}}
          isOpen={openModal === MODAL_NAMES.CONTACT_MODAL}
          onClose={onClose}
        />
        <ImagePicker
          callback={handleImageSelect}
          isOpen={openModal === MODAL_NAMES.IMAGE_ACTION_SHEET}
          onClose={onClose}
          mediaType={mediaType}
        />
        <ImageView
          images={[{uri: image?.uri}]}
          imageIndex={0}
          visible={openModal === MODAL_NAMES.VIEW_IMAGE}
          onRequestClose={onClose}
        />
      </Box>
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
const CategoryItem = memo(({handleSelectCategory, name, _id, image}) => {
  const [isChecked, setIsChecked] = useState(false);
  console.log('item');
  const onCheck = useCallback(e => {
    e?.stopPropagation?.();
    setIsChecked(p => !p);
    handleSelectCategory(_id);
  }, []);
  return (
    <Pressable onPress={onCheck}>
      <HStack h={35} my={2} alignItems="center" px={6} w="100%">
        <Avatar
          size="sm"
          source={{
            uri: image,
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
});

const CategoryList = memo(({handleSelectCategory, categories}) => {
  //flat list for category item
  console.log('list');
  return (
    <FlatList
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
      estimatedItemSize={35}
    />
  );
});
const ContactModal = ({
  initialValues,
  isOpen = false,
  onClose = undefined,
  handleChange,
}) => {
  // const leastDestructiveRef = useRef(null);
  const updateContact = async values => {
    handleChange(values.email, 'email');
    await sleep(500);
    handleChange(values.phone, 'phone');
    await sleep(500);
    onClose?.();
  };
  const fields = [
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
  ];
  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      // leastDestructiveRef={leastDestructiveRef}
      onClose={onClose}>
      <Formik
        enableReinitialize
        onSubmit={updateContact}
        initialValues={{...initialValues}}>
        {({handleSubmit, isSubmitting}) => (
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Contact</Modal.Header>

            <Modal.Body px={6}>
              {fields.map((field, index) => (
                <CustomInput key={index} {...field} />
              ))}
              <HStack justifyContent="space-between" mt={5} style={{gap: 5}}>
                <CustomButton
                  textProps={{color: COLORS.primaryDark, bold: true}}
                  noGradient
                  buttonProps={{
                    // w: '47%',
                    flex: 1,
                    bg: COLORS.lightColor,
                    _pressed: {
                      bg: COLORS.lightColor,
                    },
                    // variant: 'ghost',
                    // colorScheme: '',
                    onPress: onClose,
                  }}>
                  Cancel
                </CustomButton>
                <CustomButton
                  textProps={{color: COLORS.white, bold: true}}
                  buttonProps={{
                    flex: 1,
                    // _loading: {
                    //   bg: COLORS.primary,
                    // },
                    isLoading: isSubmitting,
                    isLoadingText: 'Updating...',
                    // bg: COLORS.danger,
                    colorScheme: 'primarydark',
                    onPress: handleSubmit,
                    // w: '47%',
                  }}
                  noGradient>
                  Update
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
const ScheduleModal = ({handleSelectDate, onClose, day}) => {
  // const leastDestructiveRef = useRef(null);
  const [selectedDay, setSelectedDay] = useState(day || null);
  const [days, setDays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rangeDate, setRangeDate] = useState({
    from: null,
    to: null,
  });
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const showTime = () => {
    setShowTimePicker(true);
  };

  const handleTimeChange = (event, time) => {
    setShowTimePicker(Platform.OS === 'ios'); // On iOS, the picker doesn't dismiss by itself

    if (time) {
      setSelectedTime(time);
    }
  };

  const dateCompRef = useRef(null);

  const dispatch = useDispatch();
  const getDays = async () => {
    setIsLoading(true);
    const {error, data} = await dispatch(getDaysAction());
    setIsLoading(false);
    console.log(data, 'data');
    setDays(data || []);
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error in fetching Data',
      });
    }
  };
  useEffect(() => {
    getDays();
  }, []);
  const handleSubmit = () => {
    handleSelectDate({selectedDay, rangeDate, time: selectedTime});
    onClose();
  };
  const onDateChange = (date, type) => {
    console.log(date, type);
    if (type === 'END_DATE') {
      setRangeDate(p => ({...p, to: new Date(date)}));
    } else {
      setRangeDate({
        from: new Date(date),
        to: null,
      });
    }
  };
  const setDay = day => {
    setSelectedDay(p => {
      let exist = p?._id === day._id;
      if (exist) {
        return null;
      }
      return day;
    });
    dateCompRef.current?.resetSelections();
    setRangeDate({
      to: null,
      from: null,
    });
  };
  return (
    <Modal
      size="xl"
      isOpen={true}
      // leastDestructiveRef={leastDestructiveRef}
      onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Schedule Days</Modal.Header>

        <Modal.Body px={6}>
          {isLoading ? (
            <Center>
              <Spinner />
            </Center>
          ) : !isLoading && !days.length ? (
            <Center my={3}>
              <CustomText>No Schedule Days Available</CustomText>
            </Center>
          ) : (
            <>
              <Flex flexDirection="row" flexWrap="wrap">
                {days?.map((field, index) => (
                  <Pressable key={field._id} onPress={() => setDay(field)}>
                    <Badge
                      rounded="sm"
                      variant={
                        selectedDay?._id === field._id ? 'solid' : 'outline'
                      }
                      colorScheme="primary"
                      key={field._id}
                      m={1}
                      alignSelf="center">
                      {field.days} Days
                    </Badge>
                  </Pressable>
                ))}
              </Flex>
              {selectedDay && <Divider my={2} />}
              {/* <Pressable onPress={showTime}> */}
              <Box>
                {/* <DateTimePicker
                value={selectedTime}
                mode="time"
                // display="default"
                onChange={handleTimeChange}
                onConfirm={()=>{}}
                onError={(e)=>console.log(e)}
                /> */}
                {selectedDay && (
                  <Flex justifyContent="center">
                    <CustomText textAlign="center">Select Time</CustomText>
                    <Box flex={1} justifyContent="center" alignItems="center">
                      <RNDateTimePicker
                        value={selectedTime}
                        mode="time"
                        // display="inline"
                        onChange={handleTimeChange}
                        onConfirm={() => {}}
                        onError={e => console.log(e)}
                      />
                    </Box>
                  </Flex>
                )}
              </Box>
              {/* </Pressable> */}
              {selectedDay && (
                <Box mt={2}>
                  <CalendarPicker
                    ref={dateCompRef}
                    onDateChange={onDateChange}
                    width={Dimensions.get('window').width - 50}
                    previousTitle="<"
                    nextTitle=">"
                    selectedDayColor="#0D103D"
                    selectedDayTextColor="#FFFFFF"
                    minDate={new Date()}
                    allowRangeSelection
                    maxRangeDuration={(selectedDay?.days || 7) - 1}
                  />
                </Box>
              )}
            </>
          )}
          <HStack justifyContent="space-between" mt={5} style={{gap: 5}}>
            <CustomButton
              textProps={{color: COLORS.primaryDark, bold: true}}
              noGradient
              buttonProps={{
                // w: '47%',
                flex: 1,
                bg: COLORS.lightColor,
                _pressed: {
                  bg: COLORS.lightColor,
                },
                // variant: 'ghost',
                // colorScheme: '',
                onPress: onClose,
              }}>
              Cancel
            </CustomButton>
            <CustomButton
              textProps={{color: COLORS.white, bold: true}}
              buttonProps={{
                isDisabled:
                  !days.length ||
                  isLoading ||
                  (selectedDay && (!rangeDate.from || !rangeDate.to)),
                flex: 1,
                // _loading: {
                //   bg: COLORS.primary,
                // },
                // bg: COLORS.danger,
                colorScheme: 'primarydark',
                onPress: !days.length || isLoading ? () => {} : handleSubmit,
                // w: '47%',
              }}
              noGradient>
              Update
            </CustomButton>
          </HStack>
        </Modal.Body>
        {/* <Modal.Footer> */}
        {/* </Modal.Footer> */}
      </Modal.Content>
    </Modal>
  );
};
