/* eslint-disable react-hooks/rules-of-hooks */
import CustomButton from '@components/CustomButton/CustomButton';
import PostCard from '@components/PostCard/PostCard';
import {COLORS} from '@utils/colors';
import {sleep} from '@utils/helpers';
import {Box, StatusBar, useColorModeValue} from 'native-base';
import {useEffect, useState, useCallback} from 'react';
import {Dimensions} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {FlashList} from '@shopify/flash-list';

function ListOfPostsScreen() {
  const [list, setList] = useState([]);
  const handleSet = async () => {
    await sleep(500);
    setList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  };
  useEffect(() => {
    // handleSet();
  }, []);
  const renderItem = useCallback(({item}) => <PostCard key={item} />, []);
  return (
    <Box bg={COLORS.bg} flex="1" p={3}>
      <FlashList data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} renderItem={renderItem} estimatedItemSize={120} />
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
