/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  HStack,
  Heading,
  Icon,
  Pressable,
  Radio,
  Spinner,
  StatusBar,
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
import {initStripe, useStripe} from '@stripe/stripe-react-native';
import {COLORS} from '@utils/colors';
import {sleep} from '@utils/helpers';
import {Dimensions, FlatList, StyleSheet} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import Toast from 'react-native-toast-message';
import {connect} from 'react-redux';
import {
  createSubscriptionAction,
  getPlansAction,
} from 'redux/adsActions/adsActions';
import {fetchMySubscription} from 'redux/PaymentActions/PaymentActions';
const actions = {
  getPlansAction,
  createSubscriptionAction,
};
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
)(({getPlansAction, createSubscriptionAction, type}) => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState('');
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [plansList, setPlansList] = useState([]);
  const {goBack} = useNavigation();
  const createPaymentIntent = async id => {
    try {
      const {data} = await createSubscriptionAction(id);
      setPaymentIntent(data.client_secret);
      return data.client_secret;
    } catch (error) {
      console.log('Error creating Payment Intent:', error.message);
    }
  };

  const initializePaymentSheet = async id => {
    const ck = await createPaymentIntent(id);
    console.log({paymentIntent, ck});
    if (!paymentIntent && !ck) {
      console.log('Payment Intent not found');
      return;
    }

    const {error, paymentOption} = await initPaymentSheet({
      paymentIntentClientSecret: paymentIntent || ck,
      merchantDisplayName: 'Ola Ads',
      customerEphemeralKeySecret: null,
      // customerId: null,
      // customFlow: true,
      // allowsDelayedPaymentMethods: true,
    });

    console.log({error});
    if (!error) {
      setLoading(LOADING_TYPE.LOADING_PLAN);
    }
  };
  const openPaymentSheet = async id => {
    setLoading(LOADING_TYPE.LOADING_PLAN);
    try {
      const ck = await initializePaymentSheet(id);
      const {error} = await presentPaymentSheet();
      setLoading('');
      if (error) {
        console.log(`Error code: ${error.code}`, error.message);
      } else {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Your order is confirmed!',
        });
        await sleep(500);
        goBack();
      }
    } catch (error) {
      console.error(error);
      setLoading('');
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
  useEffect(() => {
    // if (PLANS_TYPE.SUBSCRIPTION === type) {
    //   fetchSubscription();
    // } else
    fetchPlans();
    async function initialize() {
      await initStripe({
        publishableKey:
          'pk_test_51NDCRPINlBctypvqneWKS9nmWJVqcfRkW0IySEDnOJcuSHpxtKOJ61lNARhMzxOv0Ut8Zn5kqHczsZoNoF5j1m0n00VDU92ir4',
      });
      // await initializePaymentSheet();
    }
    initialize().catch(console.error);
  }, []);

  return (
    <>
      {loading === LOADING_TYPE.LOADING_PLAN && (
        <Box
          position="absolute"
          top={0}
          left={0}
          // flex={1}

          zIndex={100}
          h="100%"
          w="100%"
          bg="rgba(255, 255, 255, 0.9)"
          justifyContent="center"
          alignItems="center">
          <Spinner size="large" />
        </Box>
      )}
      <VStack space={5} bg={COLORS.bg} flex="1" p={3}>
        {loading === LOADING_TYPE.FETCHING_PLANS ? (
          [1, 2, 3, 4].map(x => <PlanSkeleton key={x} />)
        ) : (
          <FlatList
            estimatedItemSize={120}
            data={plansList}
            renderItem={({item}) => (
              <RenderItem
                key={item.title}
                {...item}
                handlePayPress={openPaymentSheet}
              />
            )}
          />
        )}
      </VStack>
    </>
  );
});
// export default ListOfPlansScreen;

const RenderItem = ({index, handlePayPress, ...item}) => (
  <Pressable onPress={() => handlePayPress(item._id)}>
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
      <CornerLabel cornerRadius={45} style={{backgroundColor: COLORS.primary}}>
        <Icon
          // p={1}
          as={<MaterialIcon name="star" />}
          style={st.startIcon}
          color={COLORS.white}
        />
      </CornerLabel>
    </Box>
  </Pressable>
);
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
  const [routes] = useState([
    {
      key: 'first',
      title: 'Subscribed',
    },
    {
      key: 'second',
      title: 'More Plans',
    },
  ]);

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
      renderScene={renderScene}
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
