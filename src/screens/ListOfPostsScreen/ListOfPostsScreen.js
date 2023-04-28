/* eslint-disable react-hooks/rules-of-hooks */
import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Center,
  Container,
  FlatList,
  Flex,
  HStack,
  Heading,
  Image,
  Pressable,
  Spacer,
  Stack,
  StatusBar,
  VStack,
  useColorModeValue,
} from 'native-base';
import {useState} from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LIST_OF_GROUPS} from './groups';
import {TabView, SceneMap} from 'react-native-tab-view';
import {Animated, Dimensions, useWindowDimensions} from 'react-native';
import CustomButton from '@components/CustomButton/CustomButton';
import CustomText from '@components/CustomText/CustomText';
import {COLORS} from '@utils/colors';
import CustomBadge from '@components/CustomBadge/CustomBadge';

function ListOfPostsScreen() {
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
// export default ListOfPostsScreen;

const RenderItem = ({item, index}) => (
  <Box
    p={2}
    // maxW="80"
    mt={3}
    rounded="lg"
    overflow="hidden"
    borderColor="coolGray.200"
    borderWidth="1"
    _dark={{
      borderColor: 'coolGray.600',
      backgroundColor: 'gray.700',
    }}
    _light={{
      backgroundColor: '#fff',
    }}>
    <Box space={1} flexDirection="row" alignItems="center">
      <Image
        rounded="lg"
        h={135}
        w={160}
        source={{
          uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
        }}
        alt="image"
      />
      <Box paddingLeft={3} paddingRight={1} py={1} flex="1">
        <VStack space={1}>
          <Box>
            <Heading
              color={COLORS.primaryDark}
              fontWeight="medium"
              size="sm"
              letterSpacing="lg"
              lineHeight="lg"
              style={{
                textTransform: 'capitalize',
              }}
              // ml="-1"
            >
              We are hiring lets join our team Now
            </Heading>
          </Box>
          <HStack my={1} space={1} flexWrap="wrap" flexDirection="row">
            {Array(6)
              .fill('Group')
              .map((x, i) => (
                // <Box key={x + i}>
                <CustomBadge my={1} key={x + i}>{`${x} ${i + 1}`}</CustomBadge>
                // </Box>
              ))}
          </HStack>
          <CustomText
            color="coolGray.400"
            _dark={{
              color: 'warmGray.200',
            }}
            style={{
              fontSize: 10,
            }}
            letterSpacing="lg"
            fontWeight="bold">
            Posted On: 13/May/2023 12:45 PM
          </CustomText>
        </VStack>
      </Box>
    </Box>
  </Box>
);
const FirstRoute = () => <ListOfPostsScreen />;

const SecondRoute = () => <ListOfPostsScreen />;

const ThirdRoute = () => <ListOfPostsScreen />;

const initialLayout = {
  width: Dimensions.get('window').width,
};
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

// function Example() {
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
function Example() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'first',
      title: 'Approved',
    },
    {
      key: 'second',
      title: 'Pending',
    },
    {
      key: 'third',
      title: 'Rejected',
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

export default () => {
  return <Example />;
};
