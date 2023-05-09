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
import {Dimensions, StyleSheet} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {FlashList} from '@shopify/flash-list';
const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    right: -65,
    top: 0,
    width: 120,
    transform: [{rotate: '45deg'}],
    backgroundColor: 'black',
    color: 'white',
    // padding: 4,
    textAlign: 'center',
  },
});

function ListOfPlansScreen() {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(null);

  const createPaymentIntent = async () => {
    try {
      const response = await fetch(
        'https://api.stripe.com/v1/payment_intents',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
              'Bearer ' +
              'sk_test_51N2DsJCnPuYN2rinvJzrPNwVTxISNUVcooTta4GDRNqGJ5Yb0JNibMIKj9vwNZESM2h6UkZbtvNo8vE4PZwPKQ0w00e8OsYX2y',
          },
          body: 'amount=1000&currency=usd',
          // &payment_method_types[]=card&payment_method_types[]=platform_pay',
          // &payment_method_types[]=giropay&payment_method_types[]=sofort&payment_method_types[]=bancontact&payment_method_atypes[]=eps&payment_method_types[]=ideal&payment_method_types[]=sepa_debit&payment_method_types[]=afterpay_clearpay&payment_method_types[]=grabpay&payment_method_types[]=alipay&payment_method_types[]=wechat'
        },
      );

      const {client_secret, ...x} = await response.json();
      console.log({client_secret, x});
      setPaymentIntent(client_secret);
      return client_secret;
    } catch (error) {
      console.log('Error creating Payment Intent:', error.message);
    }
  };

  const initializePaymentSheet = async () => {
    const ck = await createPaymentIntent();
    console.log({paymentIntent, ck});
    if (!paymentIntent && !ck) {
      console.log('Payment Intent not found');
      return;
    }

    const {error, paymentOption} = await initPaymentSheet({
      paymentIntentClientSecret: paymentIntent || ck,
      merchantDisplayName: 'Example, Inc.',
      customerEphemeralKeySecret: null,
      customerId: null,
      customFlow: true,
      // allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'John Doe',
      },
    });

    console.log({error});
    if (!error) {
      setLoading(true);
    }
  };
  const openPaymentSheet = async () => {
    setLoading(true);
    try {
      const {error} = await presentPaymentSheet();
      setLoading(false);
      if (error) {
        console.log(`Error code: ${error.code}`, error.message);
      } else {
        console.log('Success', 'Your order is confirmed!');
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function initialize() {
      await initStripe({
        publishableKey:
          'pk_test_51N2DsJCnPuYN2rinLMHNM7SnzPHMrhgZOdtKb7xUBUntzatdw8utlZpCNTwZyhIL9ShQBddovI4lQA2TWEZBDRgR009G3YVIMz',
      });
      await initializePaymentSheet();
    }
    initialize().catch(console.error);
  }, []);

  return (
    <Box bg={COLORS.bg} flex="1" p={3} >
       {loading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          h="200"
          w="100%"
          bg="rgba(255, 255, 255, 0.5)"
          justifyContent="center"
          alignItems="center">
          <Spinner size="large" />
        </Box>
      )}
      <FlashList
        estimatedItemSize={120}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={({item}) => (
          <RenderItem key={item} handlePayPress={openPaymentSheet} />
        )}
      />
    </Box>
  );
}
// export default ListOfPlansScreen;

const RenderItem = ({item, index, handlePayPress}) => (
  <Pressable onPress={handlePayPress}>
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
                Welcome Free Plans
              </CustomText>
              <HStack alignItems="center">
                <Heading size="2xl">$ 25</Heading>
                <CustomText color={COLORS.muted} ml={2}>
                  / Month
                </CustomText>
              </HStack>
              <CustomText letterSpacing="lg" color={COLORS.muted} fontSize={16}>
                Description of Plan
              </CustomText>
            </VStack>
          </Box>
          <Box
            paddingLeft={3}
            paddingRight={1}
            py={1}
            flex="1"
            style={{transform: [{scale: 0.8}]}}>
            <VStack space={1}>
              <Radio.Group name="r-1" isReadOnly value="one">
                <Radio value="one" my={1} size="sm" colorScheme="primarydark">
                  <CustomText>Two ads free of cost.</CustomText>
                </Radio>
              </Radio.Group>

              <Radio.Group name="r-2" isReadonly value="two">
                <Radio value="two" size="sm" my={1} colorScheme="primarydark">
                  <CustomText>No Expiration date</CustomText>
                </Radio>
              </Radio.Group>
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
