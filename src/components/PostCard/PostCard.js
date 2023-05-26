import CustomBadge from '@components/CustomBadge/CustomBadge';
import CustomText from '@components/CustomText/CustomText';
import MaterialIcon from '@components/MaterialIcon/MaterialIcon';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '@utils/colors';
import {Box, HStack, Icon, Image, Pressable, VStack} from 'native-base';
import {SCREEN_NAMES} from 'screens/screenNames';
import Video from 'react-native-video';
import {useRef} from 'react';
import {BASIC_URL} from '@utils/Urls';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PlayIcon from 'assets/playIcon.png';
import PlayBG from 'assets/playBG.png';
import {StyleSheet, View} from 'react-native';
const styles = StyleSheet.create({
  container: {
    // flex: 1,

    height: 135,
    width: 160,
    borderRadius: 10,
    overflow: 'hidden',
  },
  video: {
    flex: 1,

    // overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#00000099',

    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: 50,
    height: 50,
  },
});
const PostCard = ({
  description,
  status,
  categories,
  date,
  _id,
  media,
  noStatusIcon,
}) => {
  console.log({categories})
  const {navigate} = useNavigation();
  const ref = useRef(null);
  const handleClick = () => {
    navigate(SCREEN_NAMES.POST_DETAILS, {
      _id,
      description,
      status,
      categories,
      date,
      media,
    });
  };

  return (
    <Pressable onPress={handleClick} id={_id}>
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
        {!noStatusIcon && status && (
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
          {media?.type === 'video' ? (
            <Box
              style={styles.container}
              // rounded="lg"
            >
              <Video
                onLoad={load => {
                  console.log({load});
                }}
                onError={err => {
                  ref?.current?.play?.();
                  console.log({err});
                }}
                onLoadStart={load => {
                  console.log({load});
                }}
                source={{
                  uri: BASIC_URL + media?.pathname,
                  type: 'mp4',
                }} // Can be a URL or a local file.
                style={styles.video}
                ref={ref}
                resizeMode="stretch"
              />

              <Box style={styles.overlay}>
                <Image
                  source={PlayIcon}
                  style={styles.playIcon}
                  alt="Play Icon"
                />
              </Box>
            </Box>
          ) : (
            <Image
              rounded="lg"
              h={135}
              w={160}
              source={{
                uri: BASIC_URL + media?.pathname,
              }}
              alt="image"
            />
          )}
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
                  {description?.length > 50
                    ? description?.substring(0, 50) + '...'
                    : description}
                </CustomText>
              </Box>
              <HStack my={1} space={1} flexWrap="wrap" flexDirection="row">
                {(categories || []).map((x, i) => (
                  // <Box key={x + i}>
                  <CustomBadge my={1} key={x}>
                    {x}
                  </CustomBadge>
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
                Posted On:
                {new Date(date).toLocaleString() ||
                  'Posted On: 13/May/2023 12:45 PM'}
              </CustomText>
            </VStack>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
};

export default PostCard;
