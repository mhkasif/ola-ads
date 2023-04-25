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
import {Box, Center, Flex, Heading, Image, Pressable} from 'native-base';
import React from 'react';
import {connect} from 'react-redux';
import {SCREEN_NAMES} from 'screens/screenNames';
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
const UserProfile = ({user}) => {
  const {navigate} = useNavigation();

  const cards = [
    {name: 'Activate / Deactivate', icon: User},
    {
      name: 'Change Password',
      icon: Password,
      onPress: () => navigate(SCREEN_NAMES.CHANGE_PASSWORD),
    },
    {name: 'Choose Your Plan', icon: Plan},
    {name: 'Contact Us', icon: Phone},
    {name: 'Terms & Conditions', icon: Terms},
    {name: 'Logout', icon: Logout, bg: COLORS.danger},
  ];
  const submitProfile = async () => {
    await sleep(1000);
    return;
  };

  return (
    <Box w="100%" h="100%" bg={COLORS.bg}>
      <Center mt={10}>
        <Image
          bg="yellow.500"
          size={150}
          borderRadius={100}
          source={{
            uri: 'https://wallpaperaccess.com/full/317501.jpg',
          }}
          alt="Alternate Text"
          mb={3}
        />
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
    justifyContent="space-around"
    borderRadius={4}
    w="45%"
    // maxW="42%"
    px={4}
    py={2}
    m={2}
    h={84}>
    <Pressable onPress={onPress}>
      <Image source={icon} alt={name} />
      <CustomText color={bg ? COLORS.white : COLORS.primary}>{name}</CustomText>
    </Pressable>
  </Box>
);

const mapStateToProps = state => ({
  user: state.auth?.user,
});
export default connect(mapStateToProps)(UserProfile);
