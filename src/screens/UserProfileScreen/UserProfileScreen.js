import ConfirmationModal from '@components/ConfirmationModal/ConfirmationModal';
import CustomText from '@components/CustomText/CustomText';
import {StackActions, useNavigation} from '@react-navigation/native';
import {IMAGE_DIRECTORY} from '@utils/Urls';
import {COLORS} from '@utils/colors';
import Logout from 'assets/profileIcons/logout.png';
import Password from 'assets/profileIcons/password.png';
import Phone from 'assets/profileIcons/phone.png';
import Plan from 'assets/profileIcons/plan.png';
import Terms from 'assets/profileIcons/terms.png';
import User from 'assets/profileIcons/user.png';
import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Pressable,
  ScrollView,
} from 'native-base';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {clearAds} from 'redux/adsActions/adsActions';
import {deactivateUserAction, logoutAction} from 'redux/authSlice/authActions';
import {SCREEN_NAMES} from 'screens/screenNames';

const MODAL_NAMES = {
  LOGOUT: 'LOGOUT',
  DEACTIVATE: 'DEACTIVATE',
};
const UserProfile = ({user, logoutAction, clearAds, deactivateUserAction}) => {
  const [modalOpen, setModalOpen] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const onClose = () => {
    setModalOpen('');
  };
  const openModal = name => () => {
    setModalOpen(name);
  };
  const {navigate, ...navigation} = useNavigation();
  const resetAction = StackActions.replace(SCREEN_NAMES.AUTH);

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
    {
      name: 'Choose Your Plan',
      icon: Plan,
      onPress: () => navigate(SCREEN_NAMES.PLANS),
    },
    {
      name: 'Contact Us',
      icon: Phone,
      onPress: () => navigate(SCREEN_NAMES.CONTACT),
    },

    {
      name: 'Terms & Conditions',
      icon: Terms,
      onPress: () => navigate(SCREEN_NAMES.Terms),
    },
    {
      name: 'Logout',
      icon: Logout,
      bg: COLORS.danger,
      onPress: openModal(MODAL_NAMES.LOGOUT),
    },
  ];
  const handleLogout = async () => {
    setIsLoading(true);
    let res = await logoutAction();
    setIsLoading(false);

    if (res) navigation.dispatch(resetAction);
  };
  const handleDeactivate = async () => {
    setIsLoading(true);
    let res = await deactivateUserAction();
    setIsLoading(false);
    if (res) navigation.dispatch(resetAction);
  };
  return (
    <Box flex={1} bg={COLORS.bg}>
      <ScrollView>
        <ConfirmationModal
          isLoading={isLoading}
          title="Logout"
          body="Are you sure you want to logout?"
          isOpen={modalOpen === MODAL_NAMES.LOGOUT}
          onClose={onClose}
          handleAction={handleLogout}
          actionText="Yes, I'm sure"
        />
        <ConfirmationModal
          isLoading={isLoading}
          title="Deactivate Account"
          isLoadingText="Deactivating..."
          body="Are you sure you want to deactivate your account?"
          isOpen={modalOpen === MODAL_NAMES.DEACTIVATE}
          onClose={onClose}
          handleAction={handleDeactivate}
        />

        <Center mt={10}>
          <Avatar
            size="2xl"
            source={{
              uri:
                (user?.photo && IMAGE_DIRECTORY + user.photo) ||
                'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            }}
            borderColor={COLORS.primary}
            // borderWidth={2}

            alt="Profile Picture"
            mb={3}
          />

          <Heading color={COLORS.primary} letterSpacing="xl">
            {user?.fullName}
          </Heading>
          <CustomText color={COLORS.muted} letterSpacing="xl">
            {user?.email}
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
        </Center>
        <CustomText my={2} textAlign="center">
          V_1.0.0
        </CustomText>
      </ScrollView>
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
    // py={2}
    m={2}
    h={84}>
    <Pressable onPress={onPress}>
      <Image
        source={icon}
        alt={name}
        my={2}
        h={7}
        resizeMode="contain"
        style={{aspectRatio: 1.1}}
      />

      <CustomText color={bg ? COLORS.white : COLORS.primary}>{name}</CustomText>
    </Pressable>
  </Box>
);
const mapStateToProps = state => ({
  user: state.auth?.user,
});
const actions = {
  logoutAction,
  clearAds,
  deactivateUserAction,
};
export default connect(mapStateToProps, actions)(UserProfile);
