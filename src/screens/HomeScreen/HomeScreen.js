/* eslint-disable react-hooks/rules-of-hooks */
import AdsList from '@components/AdsList/AdsList';
import CustomText from '@components/CustomText/CustomText';
import {useNavigation} from '@react-navigation/native';
import {IMAGE_DIRECTORY} from '@utils/Urls';
import {COLORS} from '@utils/colors';
import {Avatar, Box, HStack, Heading, Pressable, VStack} from 'native-base';
import {useEffect, useState} from 'react';
import {connect, useSelector} from 'react-redux';
import {getAdsAction} from 'redux/adsActions/adsActions';
import {SCREEN_NAMES} from 'screens/screenNames';

function HomeScreen() {
  const {
    auth: {user},
  } = useSelector(state => state);
  // const [loading, setLoading] = useState(true);
  const {navigate} = useNavigation();

  const navigateToProfile = () => {
    navigate('_' + SCREEN_NAMES.PROFILE);
  };
  useEffect(() => {}, []);
  return (
    <Box bg={COLORS.bg} flex="1" p={3} py={6}>
      <HStack alignItems="center">
        <Box>
          <Pressable onPress={navigateToProfile}>
            <Avatar
              size="lg"
              source={{
                uri: user?.photo && IMAGE_DIRECTORY + user.photo,
              }}
              borderColor={COLORS.primary}
              // borderWidth={2}
              alt="Profile Picture"
              // mb={3}
            />
          </Pressable>
        </Box>
        <Box ml={3}>
          <VStack>
            <Heading>Hey! {user?.fullName?.split(' ')?.[0]}</Heading>
            <CustomText fontWeight="medium" letterSpacing="lg" fontSize="md">
              Welcome to ola
            </CustomText>
          </VStack>
        </Box>
      </HStack>
      <CustomText fontSize="lg" bold my={3}>
        Recent
      </CustomText>
      <AdsList />
    </Box>
  );
}
const actions = {
  getAdsAction,
};
export default connect(null, actions)(HomeScreen);
