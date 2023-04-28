/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  FlatList,
  HStack,
  Heading,
  Icon,
  Pressable,
  Radio,
  StatusBar,
  VStack,
  useColorModeValue,
} from 'native-base';
import {useState} from 'react';
// import {LIST_OF_GROUPS} from './groups';
import CornerLabel from '@components/CornerLabel/CornerLabel';
import CustomButton from '@components/CustomButton/CustomButton';
import CustomText from '@components/CustomText/CustomText';
import MaterialIcon from '@components/MaterialIcon/MaterialIcon';
import {COLORS} from '@utils/colors';
import {Dimensions, StyleSheet} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {LIST_OF_GROUPS} from 'screens/ListOfPostsScreen/groups';
const Banner = ({message, style}) => {
  return (
    <Icon
      style={[styles.banner, style]}
      as={<MaterialIcon name={message} />}
      size="lg"
    />
  );
};

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
  const [listData, setListData] = useState(LIST_OF_GROUPS);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        cursor="pointer"
        bg="coolGray.200"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <Icon name="more-horiz" />
          <CustomText fontSize="xs" fontWeight="medium" color="coolGray.800">
            More
          </CustomText>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <Icon name="delete" />
          <CustomText color="white" fontSize="xs" fontWeight="medium">
            Delete
          </CustomText>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <Box bg={COLORS.bg} flex="1" p={3}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={({x}) => <RenderItem key={x} />}
      />
    </Box>
  );
}
// export default ListOfPlansScreen;

const RenderItem = ({item, index}) => (
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
      <Box flex="1" space={1} flexDirection="row" alignItems="center">
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
        <Box paddingLeft={3} paddingRight={1} py={1} flex="1" style={{transform:[{scale:0.8}]}}>
          <VStack space={1}>
            <Radio.Group name="r-1" isReadOnly value="one" >
              <Radio value="one" my={1} size="sm"  colorScheme="primarydark" >
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
      <CornerLabel cornerRadius={45} style={{backgroundColor: COLORS.primary}}>
        <Icon
          // p={1}
          as={<MaterialIcon name="star" />}
          style={st.startIcon}
          color={COLORS.white}
        />
      </CornerLabel>
    </Box>
  </Box>
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
