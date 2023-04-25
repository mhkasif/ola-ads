import CustomButton from '@components/CustomButton/CustomButton';
import CustomInput from '@components/CustomInput/CustomInput';
import {sleep} from '@utils/helpers';
import {Formik} from 'formik';
import {Box, Center, Flex, HStack, Heading, Image, VStack} from 'native-base';
import React from 'react';
import * as Yup from 'yup';
import User from 'assets/profileIcons/user.png';
import Password from 'assets/profileIcons/password.png';
import Plan from 'assets/profileIcons/plan.png';
import Phone from 'assets/profileIcons/phone.png';
import Terms from 'assets/profileIcons/terms.png';
import Logout from 'assets/profileIcons/logout.png';
import CustomText from '@components/CustomText/CustomText';
import {COLORS} from '@utils/colors';
import {connect} from 'react-redux';
const fields = [
  {name: 'userName', label: 'Username', validate: true},
  {name: 'fullName', label: 'Full Name', validate: true},
  {name: 'email', label: 'Email', validate: true, type: 'email'},
  {name: 'phoneNumber', label: 'Phone Number', validate: true, type: 'number'},
];
const cards = [
  {name: 'Activate / Deactivate', icon: User},
  {name: 'Change Password', icon: Password},
  {name: 'Choose Your Plan', icon: Plan},
  {name: 'Contact Us', icon: Phone},
  {name: 'Terms & Conditions', icon: Terms},
  {name: 'Logout', icon: Logout, bg: COLORS.danger},
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
  console.log({user});
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
          {cards.map((card, index) => (
            <Card key={index} name={card.name} icon={card.icon} bg={card.bg} />
          ))}
        </Flex>
        {/* </Box> */}
      </Center>
    </Box>
  );
};

const Card = ({name, icon, bg}) => (
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
    <Image source={icon} alt={name} />
    <CustomText color={bg ? COLORS.white : COLORS.primary}>{name}</CustomText>
  </Box>
);

const mapStateToProps = state => ({
  user: state.auth?.user,
});
export default connect(mapStateToProps)(UserProfile);
