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
import {initStripe, useStripe} from '@stripe/stripe-react-native';
import {COLORS} from '@utils/colors';
import {Dimensions, FlatList, StyleSheet} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {connect} from 'react-redux';
import {
  createSubscriptionAction,
  getPlansAction,
} from 'redux/adsActions/adsActions';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {sleep} from '@utils/helpers';
const actions = {
  getPlansAction,
  createSubscriptionAction,
};
const ListOfPlansScreen = connect(
  null,
  actions,
)(({getPlansAction, createSubscriptionAction}) => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
    }
  };
  const openPaymentSheet = async id => {
    setLoading(true);
    try {
      const ck = await initializePaymentSheet(id);
      const {error} = await presentPaymentSheet();
      setLoading(false);
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
      setLoading(false);
    }
  };
  const fetchPlans = async () => {
    const {data} = await getPlansAction();

    data && setPlansList(data);
  };
  useEffect(() => {
    fetchPlans();
    async function initialize() {
      await initStripe({
        publishableKey:
          'pk_test_51NDCRPINlBctypvqneWKS9nmWJVqcfRkW0IySEDnOJcuSHpxtKOJ61lNARhMzxOv0Ut8Zn5kqHczsZoNoF5j1m0n00VDU92ir4',
        // 'pk_test_51N2DsJCnPuYN2rinLMHNM7SnzPHMrhgZOdtKb7xUBUntzatdw8utlZpCNTwZyhIL9ShQBddovI4lQA2TWEZBDRgR009G3YVIMz',
      });
      // await initializePaymentSheet();
    }
    initialize().catch(console.error);
  }, []);

  return (
    <>
      {loading && (
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
      <Box bg={COLORS.bg} flex="1" p={3}>
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
      </Box>
    </>
  );
});
// export default ListOfPlansScreen;

const RenderItem = ({index, handlePayPress, ...item}) => (
  <Pressable onPress={() => handlePayPress(item._id)}>
    <Box>
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
            as={<MaterialIcon name="star" />}
            style={st.startIcon}
            color={COLORS.white}
          />
        </CornerLabel>
      </Box>
    </Box>
  </Pressable>
);
const st = StyleSheet.create({
  startIcon: {
    transform: [{rotate: '-45deg'}],
  },
});
const FirstRoute = () => <ListOfPlansScreen />;

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
