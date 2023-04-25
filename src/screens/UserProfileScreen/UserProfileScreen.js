import CustomButton from '@components/CustomButton/CustomButton';
import CustomText from '@components/CustomText/CustomText';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '@utils/colors';
import {sleep} from '@utils/helpers';
import Logout from 'assets/profileIcons/logout.png';
import Password from 'assets/profileIcons/password.png';
import Phone from 'assets/profileIcons/phone.png';
import Plan from 'assets/profileIcons/plan.png';
import Terms from 'assets/profileIcons/terms.png';
import User from 'assets/profileIcons/user.png';
import {
  Actionsheet,
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  Modal,
  Pressable,
} from 'native-base';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {logoutAction} from 'redux/authSlice/authActions';
import {SCREEN_NAMES} from 'screens/screenNames';
import * as Yup from 'yup';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ConfirmationModal from '@components/ConfirmationModal/ConfirmationModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

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
const MODAL_NAMES = {
  LOGOUT: 'LOGOUT',
  DEACTIVATE: 'DEACTIVATE',
  IMAGE_ACTION_SHEET: 'IMAGE_ACTION_SHEET',
};
const formValidation = Yup.object().shape({
  userName: Yup.string().required('Username is required.'),
  email: Yup.string().email('Email is invalid').required('Email is required.'),
  fullName: Yup.string().required('Full name is required.'),
  phoneNumber: Yup.number('Phone number must be a number').required(
    'Phone number is required.',
  ),
});
const UserProfile = ({user, logoutAction}) => {
  const [modalOpen, setModalOpen] = useState('');
  const onClose = () => {
    setModalOpen('');
  };
  const openModal = name => () => {
    setModalOpen(name);
  };
  const {navigate} = useNavigation();

  const cards = [
    {
      name: 'Deactivate Account',
      icon: User,
      onPress: openModal(MODAL_NAMES.DEACTIVATE),
    },
    {
      name: 'Change Password',
      icon: Password,
      onPress: () => navigate(SCREEN_NAMES.CHANGE_PASSWORD),
    },
    {name: 'Choose Your Plan', icon: Plan},
    {name: 'Contact Us', icon: Phone},
    {name: 'Terms & Conditions', icon: Terms},
    {
      name: 'Logout',
      icon: Logout,
      bg: COLORS.danger,
      onPress: openModal(MODAL_NAMES.LOGOUT),
    },
  ];
  const handleLogout = async () => {
    logoutAction();
    navigate(SCREEN_NAMES.LOGIN);
  };
  return (
    <Box w="100%" h="100%" bg={COLORS.bg}>
      <ConfirmationModal
        title="Logout"
        body="Are you sure you want to logout?"
        isOpen={modalOpen === MODAL_NAMES.LOGOUT}
        onClose={onClose}
        handleAction={handleLogout}
      />
      <ConfirmationModal
        title="Deactivate Account"
        body="Are you sure you want to deactivate your account?"
        isOpen={modalOpen === MODAL_NAMES.DEACTIVATE}
        onClose={onClose}
        handleAction={handleLogout}
      />
      <ImageActionSheet
        isOpen={modalOpen === MODAL_NAMES.IMAGE_ACTION_SHEET}
        onClose={onClose}
      />
      <Center mt={10}>
        {/* <Image
          bg="yellow.500"
          size={150}
          borderRadius={100}
          source={}
          alt="Alternate Text"
          mb={3}
        /> */}
        <Pressable onPress={openModal(MODAL_NAMES.IMAGE_ACTION_SHEET)}>
          <Avatar
            size="2xl"
            source={{
              uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            }}
            borderColor={COLORS.primary}
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
        </Pressable>
        <Heading color={COLORS.primary} letterSpacing="xl">
          {user.name}
        </Heading>
        <CustomText color={COLORS.muted} letterSpacing="xl">
          {user.email}
        </CustomText>
      </Center>
      <Center w="100%" mt={5}>
        <Flex
          justifyContent="space-between"
          flexDirection="row"
          flexWrap="wrap"
          width="95%"
          my={4}>
          {cards.map(card => (
            <Card key={card.name} {...card} />
          ))}
        </Flex>
        {/* </Box> */}
      </Center>
    </Box>
  );
};

const Card = ({name, icon, bg, onPress = null}) => (
  <Box
    shadow={1}
    bg={bg || COLORS.white}
    justifyContent="space-evenly"
    borderRadius={4}
    w="45%"
    // maxW="42%"
    px={4}
    py={2}
    m={2}
    h={84}>
    <Pressable onPress={onPress}>
      <Image source={icon} alt={name} my={2} />
      <CustomText color={bg ? COLORS.white : COLORS.primary}>{name}</CustomText>
    </Pressable>
  </Box>
);
const ImageActionSheet = ({isOpen, onClose}) => {
  const handleLibraryOpen = async () => {
    try {
      const x=await launchImageLibrary();
      console.log(x)
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
const mapStateToProps = state => ({
  user: state.auth?.user,
});
const actions = {
  logoutAction,
};
export default connect(mapStateToProps, actions)(UserProfile);
