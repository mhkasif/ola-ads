/* eslint-disable react-hooks/rules-of-hooks */
import CustomText from '@components/CustomText/CustomText';
import PostCard from '@components/PostCard/PostCard';
import {COLORS} from '@utils/colors';
import {sleep} from '@utils/helpers';
import {Avatar, Box, HStack, Heading, VStack} from 'native-base';
import {useEffect, useState, useCallback} from 'react';
import {Dimensions, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

function HomeScreen() {
  const {user} = useSelector(state => state.auth);
  const [list, setList] = useState([]);
  const renderItem = useCallback(({item}) => {
    // console.log(item);
    return (
      <PostCard
        status={item === 1 ? 'approved' : item === 2 ? 'pending' : 'rejected'}
        key={item}
      />
    );
  }, []);
  const handleSet = async () => {
    await sleep(500);
    setList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  };
  useEffect(() => {
    handleSet();
  }, []);
  return (
    <Box bg={COLORS.bg} flex="1" p={3} py={6}>
      <HStack alignItems="center">
        <Box>
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
        </Box>
        <Box ml={3}>
          <VStack>
            <Heading>Hey! {user?.name}</Heading>
            <CustomText
              fontWeight="medium"
              letterSpacing="lg"
              fontSize="md"
              mt={2}>
              Welcome back to ola
            </CustomText>
          </VStack>
        </Box>
      </HStack>
      <CustomText fontSize="lg" bold my={3}>
        Recent
      </CustomText>
      <FlatList data={list} renderItem={renderItem} />
    </Box>
  );
}
// export default ListOfPostsScreen;

const initialLayout = {
  width: Dimensions.get('window').width,
};

// function HomeScreen() {
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

export default HomeScreen;
