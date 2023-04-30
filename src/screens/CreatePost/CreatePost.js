/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {
  Box,
  Center,
  HStack,
  VStack,
  Image,
  Icon,
  FlatList,
  Avatar,
  Checkbox,
  Flex,
  Modal,
  Button,
} from 'native-base';
import CustomInput from '@components/CustomInput/CustomInput';
import {Formik} from 'formik';
import {connect, useSelector} from 'react-redux';
import YUP from '@components/YUP/YUP';
import CustomText from '@components/CustomText/CustomText';
import Picture from 'assets/picture.png';
import Video from 'assets/video.png';
import CustomButton from '@components/CustomButton/CustomButton';
import MaterialIcon from '@components/MaterialIcon/MaterialIcon';
import {COLORS} from '@utils/colors';
import {sleep} from '@utils/helpers';
const fields = [
  // {
  //   my: 2,
  //   name: 'name',
  //   // label: 'Name',
  //   inputProps: {
  //     borderWidth: 0,

  //     placeholder: 'Enter your name',
  //   },
  //   bg: 'white',
  // },
  // {
  //   my: 2,

  //   name: 'email',
  //   // label: 'Email',
  //   type: 'email',
  //   inputProps: {
  //     borderWidth: 0,

  //     placeholder: 'Enter your email',
  //   },
  //   bg: 'white',
  // },
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
    },
  },
];
const formValidation = YUP.object().shape({
  // name: YUP.string().required(),
  // email: YUP.string().email().required(),
  description: YUP.string().required(),
});
function CreatePost({user, navigation}) {
  const initialValues = {
    name: user.name,
    email: user.email,
    description: '',
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton buttonProps={{isDisabled: true}} bg="success.600">
          Post
        </CustomButton>
      ),
    });
  }, []);
  const [openModal, setOpenModal] = React.useState(false);
  const onClose = () => setOpenModal(false);
  const onOpen = () => setOpenModal(true);
  return (
    <>
      <Box py={5} px={4}>
        <Box height="45%">
          <VStack>
            <Formik initialValues={{...initialValues}}>
              {({handleSubmit, isSubmitting}) => {
                return fields.map((field, index) => (
                  <CustomInput key={index} {...field} />
                ));
              }}
            </Formik>
          </VStack>
          <HStack space={3}>
            {[
              {image: Picture, title: 'Photo'},
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
                  onPress: onOpen,
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
      <Box bg="white" flex={1} borderTopRadius={30} mt={10} pb={5}>
        <Center>
          <CustomText fontSize="sm" color={COLORS.muted} my={2}>
            Select Category
          </CustomText>
        </Center>
        <Box my={4} h="85%">
          <CategoryList />
        </Box>
      </Box>
      <ConfirmationModal isOpen={openModal} onClose={onClose} />
    </>
  );
}
const mapStateToProps = state => {
  return {
    user: state.auth?.user,
  };
};
export default connect(mapStateToProps)(CreatePost);

const MediaItem = ({image, title, onPress}) => {
  return (
    <Box flex={1} bg="white" pt={5}>
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
    <FlatList
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
      renderItem={({item}) => {
        return (
          <CategoryItem key={item} checked={item % 2 === 0} title={item} />
        );
      }}
      keyExtractor={item => item}
    />
  );
};
const ConfirmationModal = ({isOpen = false, onClose = undefined}) => {
  const user = useSelector(state => state.auth?.user);
  const initialValues = {
    name: user.name,
    email: user.email,
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
                  Yes, i'm Sure
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
