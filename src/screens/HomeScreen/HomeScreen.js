/* eslint-disable react-hooks/rules-of-hooks */
import CustomText from '@components/CustomText/CustomText';
import PostCard from '@components/PostCard/PostCard';
import {FlashList} from '@shopify/flash-list';
import {COLORS} from '@utils/colors';
import {sleep} from '@utils/helpers';
import {Avatar, Box, HStack, Heading, Pressable, VStack} from 'native-base';
import {useCallback, useEffect, useState} from 'react';
import {connect, useSelector} from 'react-redux';
import {SCREEN_NAMES} from 'screens/screenNames';
import {useNavigation} from '@react-navigation/native';
import {getAdsAction} from 'redux/adsActions/adsActions';
function HomeScreen({getAdsAction}) {
  const {
    auth: {user},
    ads: {ads},
  } = useSelector(state => state);
  // const [loading, setLoading] = useState(true);
  const {navigate} = useNavigation();
  useEffect(() => {
    getAdsAction();
  }, [getAdsAction]);

  const navigateToProfile = () => {
    navigate(SCREEN_NAMES.PROFILE);
  };
  const renderItem = useCallback(({item}) => {
    console.log({item});
    return <PostCard {...item} />;
  }, []);
  useEffect(() => {}, []);
  return (
    <Box bg={COLORS.bg} flex="1" p={3} py={6}>
      <HStack alignItems="center">
        <Box>
          <Pressable onPress={navigateToProfile}>
            <Avatar
              size="lg"
              source={{
                uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
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
            <CustomText
              fontWeight="medium"
              letterSpacing="lg"
              fontSize="md"
              mt={2}>
              Welcome to ola
            </CustomText>
          </VStack>
        </Box>
      </HStack>
      <CustomText fontSize="lg" bold my={3}>
        Recent
      </CustomText>

      <FlashList
        estimatedItemSize={60}
        data={ads || []}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </Box>
  );
}
const actions = {
  getAdsAction,
};
export default connect(null, actions)(HomeScreen);
