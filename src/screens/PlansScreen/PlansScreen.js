/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Pressable,
  Radio,
  StatusBar,
  Switch,
  VStack,
  useColorModeValue,
} from 'native-base';
import {useEffect, useState} from 'react';
// import {LIST_OF_GROUPS} from './groups';
import CornerLabel from '@components/CornerLabel/CornerLabel';
import CustomButton from '@components/CustomButton/CustomButton';
import CustomText from '@components/CustomText/CustomText';
import MaterialIcon from '@components/MaterialIcon/MaterialIcon';
import {PlanSkeleton} from '@components/Skeletons/Skeleton';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '@utils/colors';
import {
  Dimensions,
  FlatList,
  Linking,
  Platform,
  StyleSheet,
} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import Toast from 'react-native-toast-message';
import {connect, useSelector} from 'react-redux';
import {
  confirmPaymentAction,
  createSubscriptionAction,
  fetchMySubscription,
  getPlansAction,
} from 'redux/PaymentActions/paymentActions';

import ConfirmationModal from '@components/ConfirmationModal/ConfirmationModal';
import Loader from 'assets/loader.gif';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {updateUserAction} from 'redux/authSlice/authActions';
import FullScreenLoader from '@components/FullScreenLoader/FullScreenLoader';
const actions = {
  getPlansAction,
  createSubscriptionAction,
  updateUserAction,
};
const isIOS = Platform.OS === 'ios';
const PLANS_TYPE = {
  SUBSCRIPTION: 'SUBSCRIPTION',
  PLANS: 'PLANS',
};
const LOADING_TYPE = {
  FETCHING_PLANS: 'FETCHING_PLANS',
  LOADING_PLAN: 'LOADING_PLAN',
};
const ListOfPlansScreen = connect(
  null,
  actions,
)(({getPlansAction, createSubscriptionAction, type, updateUserAction}) => {
  const {user, authToken} = useSelector(state => state.auth) || {};
  const subscription = user?.subscription;
  const [loading, setLoading] = useState('');
  const [plansList, setPlansList] = useState([]);
  const {goBack} = useNavigation();
  const [isYearly, setIsYearly] = useState(true);

  const openLink = async url => {
    try {
      if (!isIOS && (await InAppBrowser.isAvailable())) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#0C0F3D',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          // toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });
        console.log({result});
        // await this.sleep(800);
        // Alert.alert(JSON.stringify(result))
      } else Linking.openURL(url);
    } catch (error) {
      console.log({error});
      // Alert.alert(error.message)
    }
  };
  const openPaymentSheet = async id => {
    setLoading(LOADING_TYPE.LOADING_PLAN);
    try {
      const {data, error} = await createSubscriptionAction(id);
      if (error) throw new Error(error);

      if (data.subscription_url) await openLink(data.subscription_url);
      const {data: d, error: err} = await confirmPaymentAction(
        data.subscription_id,
      );
      if (err) throw new Error(err);
      if (d.status !== 'active') {
        throw new Error('Your Payment is Failed');
      }
      updateUserAction({subscription: d});
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Your order is confirmed!',
      });
      setLoading('');
      goBack();
    } catch (error) {
      setLoading('');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
      console.log({error});
    }
  };

  const fetchPlans = async () => {
    setLoading(LOADING_TYPE.FETCHING_PLANS);
    const {data} = await getPlansAction();

    data && setPlansList(data);
    setLoading('');
  };
  const fetchSubscription = async () => {
    setLoading(LOADING_TYPE.FETCHING_PLANS);
    const {data} = await fetchMySubscription();
    console.log({data});
    data && setPlansList([data]);
    setLoading('');
  };
  const changeSwitch = _ => {
    setIsYearly(p => !p);
  };
  useEffect(() => {
    if (PLANS_TYPE.SUBSCRIPTION === type) {
      fetchSubscription();
    } else fetchPlans();
  }, []);
  const handleAllPlans = () => {
    Linking.openURL('http://localhost:3000/plans/' + authToken);
  };
  return (
    <>
      {loading === LOADING_TYPE.LOADING_PLAN && <FullScreenLoader />}
      <VStack space={5} bg={COLORS.bg} flex="1" p={3}>
        {loading === LOADING_TYPE.FETCHING_PLANS ? (
          [1, 2, 3, 4].map(x => <PlanSkeleton key={x} />)
        ) : !loading &&
          !plansList.length &&
          PLANS_TYPE.SUBSCRIPTION === type ? (
          <CustomText textAlign="center">
            You have not subscribed to any plan yet. Please subscribe to a plan
          </CustomText>
        ) : (
          <Box>
            {!type && (
              <HStack alignItems="center" justifyContent="center">
                <CustomText
                  fontSize="lg"
                  bold
                  color={!isYearly ? COLORS.primary : COLORS.muted}>
                  Monthly
                </CustomText>
                <Switch
                  onToggle={changeSwitch}
                  isChecked={isYearly}
                  offTrackColor="muted.500"
                  onTrackColor="muted.500"
                  mx={3}
                />
                <CustomText
                  fontSize="lg"
                  bold
                  color={isYearly ? COLORS.primary : COLORS.muted}>
                  Yearly
                </CustomText>
              </HStack>
            )}

            <FlatList
              estimatedItemSize={120}
              data={
                PLANS_TYPE.SUBSCRIPTION === type
                  ? plansList
                  : plansList.filter(
                      x =>
                        (x.period === 'Yearly' && isYearly) ||
                        (x.period === 'Monthly' && !isYearly),
                    )
              }
              renderItem={({item}) => (
                <RenderItem
                  type={type}
                  key={item.title}
                  {...item}
                  handlePayPress={openPaymentSheet}
                />
              )}
            />
          </Box>
        )}
        {isIOS && type === PLANS_TYPE.SUBSCRIPTION && (
          <Box flex={1} justifyContent="flex-end">
            <CustomButton
              buttonProps={{
                onPress: handleAllPlans,
              }}>
              See All Plans
            </CustomButton>
          </Box>
        )}
      </VStack>
    </>
  );
});
// export default ListOfPlansScreen;

const RenderItem = ({index, handlePayPress, type, ...item}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const {user} = useSelector(state => state.auth) || {};
  const subscription = user?.subscription || null;
  const [loading, setLoading] = useState(false);
  const onClose = () => {
    setModalOpen(false);
  };
  const onPress = async () => {
    if (subscription) {
      return setModalOpen(true);
    }
    await handlePay();
  };
  const handlePay = async () => {
    setLoading(true);
    await handlePayPress(item._id);
  };
  return (
    <Pressable onPress={type === PLANS_TYPE.SUBSCRIPTION ? () => {} : onPress}>
      <Box
        // flex="1"
        // alignItems="center"
        p={2}
        // maxW="80"
        h={150}
        // bg={COLORS.white}
        mt={3}
        rounded="lg"
        overflow="hidden"
        borderColor={COLORS.primaryDark}
        borderWidth="1"
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _light={{
          backgroundColor: '#fff',
        }}>
        <Box
          flex="1"
          space={1}
          flexDirection="row"
          alignItems="center"
          onPress={{}}>
          <Box w="50%">
            <VStack space={1} alignItems="center">
              <CustomText bold fontSize="lg">
                {item.title}
              </CustomText>
              <HStack alignItems="center">
                <Heading size="2xl">{item.price}</Heading>
                <CustomText color={COLORS.muted} ml={2}>
                  / {item.period}
                </CustomText>
              </HStack>
            </VStack>
          </Box>
          <Box
            paddingLeft={3}
            paddingRight={1}
            py={1}
            flex="1"
            style={{transform: [{scale: 0.8}]}}>
            <VStack space={1}>
              {item.features?.map(x => (
                <Radio.Group key={x} name={x} isReadOnly value={x}>
                  <Radio value={x} my={1} size="sm" colorScheme="primarydark">
                    <CustomText>{x}</CustomText>
                  </Radio>
                </Radio.Group>
              ))}
            </VStack>
          </Box>
          {/* <Banner message="star"/>
           */}
        </Box>
        <CornerLabel
          cornerRadius={45}
          style={{backgroundColor: COLORS.primary}}>
          <Icon
            // p={1}
            as={MaterialIcon}
            name={
              item.title.toLowerCase().includes('basic')
                ? 'lightbulb'
                : item.title.toLowerCase().includes('premium')
                ? 'star'
                : 'star'
            }
            style={st.startIcon}
            color={COLORS.white}
          />
        </CornerLabel>
      </Box>
      <ConfirmationModal
        title="Change Plan"
        body="Are you sure you want to change your plan?"
        isOpen={modalOpen}
        onClose={onClose}
        handleAction={handlePay}
        actionText="Yes"
        actionColor="primary"
        isLoading={loading}
        isLoadingText="Changing Plan..."
      />
    </Pressable>
  );
};
const st = StyleSheet.create({
  startIcon: {
    transform: [{rotate: '-45deg'}],
  },
});
const FirstRoute = () => <ListOfPlansScreen type={PLANS_TYPE.SUBSCRIPTION} />;

const SecondRoute = () => <ListOfPlansScreen />;

const initialLayout = {
  width: Dimensions.get('window').width,
};
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});
const renderSceneIOS = SceneMap({
  first: FirstRoute,
});

// function Plans() {
//   const {width} = useWindowDimensions();

//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     {key: 'first', title: 'First'},
//     {key: 'second', title: 'Second'},
//   ]);

//   return (
//     <TabView
//       navigationState={{index, routes}}
//       renderScene={renderScene}
//       onIndexChange={setIndex}
//       initialLayout={{width}}
//     />
//   );
// }
function Plans() {
  const [index, setIndex] = useState(0);
  const [routes] = useState(
    isIOS
      ? [
          {
            key: 'first',
            title: 'Subscribed',
          },
        ]
      : [
          {
            key: 'first',
            title: 'Subscribed',
          },
          {
            key: 'second',
            title: 'More Plans',
          },
        ],
  );

  const renderTabBar = props => {
    // const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const borderColor =
            index === i
              ? COLORS.primary
              : useColorModeValue('coolGray.200', 'gray.400');
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p={2}
              key={route.title}
              bg="transparent"
              cursor="pointer">
              <CustomButton
                px={2}
                textProps={{
                  fontWeight: 'bold',
                  letterSpacing: 'lg',
                }}
                buttonProps={{
                  onPress: () => {
                    setIndex(i);
                  },
                }}
                key={route.title}
                secondary={index !== i}>
                {route.title}
              </CustomButton>
              {/* </Pressable> */}
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{
        index,
        routes,
      }}
      renderScene={isIOS ? renderSceneIOS : renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{
        marginTop: StatusBar.currentHeight,
        backgroundColor: COLORS.bg,
      }}
    />
  );
}

export default Plans;
