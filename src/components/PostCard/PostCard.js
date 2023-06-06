import CustomBadge from '@components/CustomBadge/CustomBadge';
import CustomText from '@components/CustomText/CustomText';
import MaterialIcon from '@components/MaterialIcon/MaterialIcon';
import Timer from '@components/Timer/Timer';
import {useNavigation} from '@react-navigation/native';
import {IMAGE_DIRECTORY} from '@utils/Urls';
import {COLORS} from '@utils/colors';
import {UTCToLocal} from '@utils/helpers';
import PlayIcon from 'assets/playIcon.png';
import {isBefore} from 'date-fns';
import {Box, HStack, Icon, Image, Pressable, VStack} from 'native-base';
import {memo, useMemo, useRef} from 'react';
import {StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {SCREEN_NAMES} from 'screens/screenNames';
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
  published = false,
  schedule_date,
  date,
  _id,
  media,
  noStatusIcon,
}) => {
  const isPublished =
    published ||
    (schedule_date && isBefore(UTCToLocal(schedule_date, true), new Date()));
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
      schedule_date,
      published,
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
                paused
                source={{
                  uri: IMAGE_DIRECTORY + media?.pathname,
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
                uri: media
                  ? IMAGE_DIRECTORY + media?.pathname
                  : 'https://placehold.co/600x400/png?text=No+Photo',
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
                {(categories || []).slice(0, 6).map((x, i) => (
                  // <Box key={x + i}>
                  <CustomBadge my={1} key={x.id}>
                    {x.name}
                  </CustomBadge>

                  // </Box>
                ))}
                {(categories || []).length > 6 && (
                  <CustomBadge my={1}>...</CustomBadge>
                )}
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
                {UTCToLocal(date)}
              </CustomText>
              {isPublished && (
                <CustomText
                  // mt={2}
                  color="coolGray.400"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  style={{
                    fontSize: 8,
                  }}
                  letterSpacing="lg"
                  fontWeight="bold">
                  {isPublished && `published At: ${UTCToLocal(schedule_date)}`}
                </CustomText>
              )}
              {!isPublished && schedule_date && (
                <CustomText
                  // mt={2}
                  color="warning.400"
                  style={{
                    fontSize: 10,
                  }}
                  letterSpacing="lg"
                  fontWeight="bold">
                  <HStack alignItems="center">
                    <Icon
                      as={MaterialIcon}
                      name="timer"
                      size="lg"
                      color="warning.500"
                    />
                    <Timer
                      color="warning.500"
                      futureDate={schedule_date}
                      published={published}
                      justTime
                    />
                  </HStack>
                </CustomText>
              )}
            </VStack>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
};

export default memo(PostCard);
