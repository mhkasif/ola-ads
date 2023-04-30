import CustomBadge from '@components/CustomBadge/CustomBadge';
import CustomText from '@components/CustomText/CustomText';
import MaterialIcon from '@components/MaterialIcon/MaterialIcon';
import {COLORS} from '@utils/colors';
import {Box, HStack, Icon, Image, Pressable, VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from 'screens/screenNames';
const PostCard = ({item, index, status}) => {
  const {navigate} = useNavigation();
  const handleClick = () => {
    navigate(SCREEN_NAMES.POST_DETAILS, {
      title: 'hello',
      description: 'hello',
      status,
    });
  };
  return (
    <Pressable onPress={handleClick}>
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
        {status && (
          <Box
            style={{
              position: 'absolute',
              top: 5,
              right: 5,
            }}>
            {status === 'approved' ? (
              <Icon
                as={MaterialIcon}
                name="check-circle"
                // size="sm"
                color="success.500"
              />
            ) : status === 'rejected' ? (
              <Icon
                as={MaterialIcon}
                name="block"
                size="sm"
                color="danger.500"
              />
            ) : status === 'pending' ? (
              <Icon
                as={MaterialIcon}
                name="schedule"
                size="sm"
                color="warning.500"
              />
            ) : null}
          </Box>
        )}
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
          <Box paddingLeft={3} paddingRight={1} py={2} flex="1">
            <VStack>
              <Box>
                <CustomText
                  color={COLORS.primaryDark}
                  fontWeight="medium"
                  //   size="xs"
                  //   letterSpacing="lg"
                  //   lineHeight="lg"
                  style={{
                    textTransform: 'capitalize',
                  }}
                  // ml="-1"
                >
                  We are hiring lets join our team Now
                </CustomText>
              </Box>
              <HStack my={1} space={1} flexWrap="wrap" flexDirection="row">
                {Array(6)
                  .fill('Group')
                  .map((x, i) => (
                    // <Box key={x + i}>
                    <CustomBadge my={1} key={x + i}>{`${x} ${
                      i + 1
                    }`}</CustomBadge>
                    // </Box>
                  ))}
              </HStack>
              <CustomText
                color="coolGray.400"
                _dark={{
                  color: 'warmGray.200',
                }}
                style={{
                  fontSize: 8,
                }}
                letterSpacing="lg"
                fontWeight="bold">
                Posted On: 13/May/2023 12:45 PM
              </CustomText>
            </VStack>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
};

export default PostCard;
