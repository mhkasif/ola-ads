/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import CustomButton from '@components/CustomButton/CustomButton';
import PostCard from '@components/PostCard/PostCard';
import {COLORS} from '@utils/colors';
import {sleep} from '@utils/helpers';
import {Box, StatusBar, useColorModeValue} from 'native-base';
import {useEffect, useState, useCallback, useMemo} from 'react';
import {Dimensions, RefreshControl} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {FlashList} from '@shopify/flash-list';
import {connect, useSelector} from 'react-redux';
import {getAdsAction} from 'redux/adsActions/adsActions';
import AdsList from '@components/AdsList/AdsList';

function ListOfPostsScreen({status}) {
  return (
    <Box bg={COLORS.bg} flex="1" p={3}>
      <AdsList status={status} />
    </Box>
  );
}
// export default ListOfPostsScreen;

const initialLayout = {
  width: Dimensions.get('window').width,
};
function Example({getAdsAction}) {
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

  const FirstRoute = useMemo(
    () =>
      index === 0
        ? () => (
            <ListOfPostsScreen getAdsAction={getAdsAction} status="approved" />
          )
        : () => <></>,
    [index],
  );

  const SecondRoute = useMemo(
    () =>
      index === 1
        ? () => (
            <ListOfPostsScreen getAdsAction={getAdsAction} status="pending" />
          )
        : () => <></>,
    [index],
  );

  const ThirdRoute = useMemo(
    () =>
      index === 2
        ? () => (
            <ListOfPostsScreen getAdsAction={getAdsAction} status="rejected" />
          )
        : () => <></>,
    [index],
  );

  const renderScene = useMemo(
    () =>
      SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
      }),
    [index],
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

export default Example;
