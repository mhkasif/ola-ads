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
import PostCard from '@components/PostCard/PostCard';

function ListOfPostsScreen() {
  const [listData, setListData] = useState(LIST_OF_GROUPS);

  return (
    <Box bg={COLORS.bg} flex="1" p={3}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={({item}) => <PostCard key={item} />}
      />
    </Box>
  );
}
// export default ListOfPostsScreen;

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
                  fontSize: 14,
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
