import CustomBadge from '@components/CustomBadge/CustomBadge';
import CustomText from '@components/CustomText/CustomText';
import Timer from '@components/Timer/Timer';
import {IMAGE_DIRECTORY} from '@utils/Urls';
import {COLORS} from '@utils/colors';
import {UTCToLocal} from '@utils/helpers';
import {isBefore} from 'date-fns';
import {Box, Divider, HStack, Image, ScrollView, VStack} from 'native-base';
import React, {useRef} from 'react';
import Video from 'react-native-video';
import ImageView from 'react-native-image-viewing';
import {Pressable} from 'react-native';
const MODAL_NAMES = {
  VIEW_IMAGE: 'VIEW_IMAGE',
};
const PostScreen = ({
  route: {
    params: {
      description,
      media,
      status,
      date,
      categories,
      _id,
      schedule_date,
      published,
    },
  },
  ...props
}) => {
  const ref = useRef(null);
  const [openModal, setOpenModal] = React.useState(false);
  const onClose = () => setOpenModal("");
  const onOpen = () => setOpenModal(MODAL_NAMES.VIEW_IMAGE);
  return (
    <Box bg={COLORS.bg} px={4} py={6} h="100%">
      {schedule_date && !published && (
        <Timer mb={3} published={published} futureDate={schedule_date} />
      )}
      {media?.pathname && (
        <ImageView
          images={[{uri: IMAGE_DIRECTORY + media?.pathname}]}
          imageIndex={0}
          visible={openModal === MODAL_NAMES.VIEW_IMAGE}
          onRequestClose={onClose}
        />
      )}
      <ScrollView>
        {media?.type?.includes('video') ? (
          <Video
            ref={ref}
            // onLoad={load => {
            //   console.log({load});
            // }}
            controls
            paused
            onError={err => {
              console.log({err});
            }}
            // onLoadStart={load => {
            //   console.log({load});
            // }}
            source={{
              uri: IMAGE_DIRECTORY + media?.pathname,
              type: 'mp4',
            }} // Can be a URL or a local file.
            style={{
              height: 200,
              width: '100%',
            }}
            resizeMode="stretch"
          />
        ) : (
          <Pressable onPress={onOpen}>
            <Image
              source={{
                uri: media
                  ? IMAGE_DIRECTORY + media?.pathname
                  : 'https://placehold.co/600x400/png?text=No+Photo',
              }}
              w="100%"
              h={200}
              resizeMode="cover"
              alt={description}
            />
          </Pressable>
        )}
        <HStack alignItems="center" my={3} justifyContent="space-between">
          <VStack>
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
              Posted On: {UTCToLocal(date)}
            </CustomText>
            {schedule_date && (
              <CustomText
                // mt={2}
                color="coolGray.400"
                _dark={{
                  color: 'warmGray.200',
                }}
                style={{
                  fontSize: 10,
                }}
                letterSpacing="lg"
                fontWeight="bold">
                {isBefore(UTCToLocal(schedule_date, true), new Date()) &&
                published
                  ? 'published At: '
                  : 'Scheduled At: '}

                {UTCToLocal(schedule_date)}
              </CustomText>
            )}
          </VStack>
          <CustomBadge
            // size="lg"
            textProps={{
              textTransform: 'capitalize',
              fontSize: 'md',
            }}
            bg={
              status === 'approved'
                ? 'green.600'
                : status === 'pending'
                ? 'yellow.500'
                : 'red.500'
            }>
            {status}
          </CustomBadge>
        </HStack>

        <CustomText fontSize="sm" mb={4} color={COLORS.muted}>
          {description}
        </CustomText>

        <Divider my={4} />

        <CustomText mb={3} fontSize="lg">
          Posted Groups:
        </CustomText>
        <HStack my={1} flexWrap="wrap" flexDirection="row">
          {(categories || []).map((x, i) => (
            // <Box key={x + i}>
            <CustomBadge
              size="lg"
              textProps={{
                textTransform: 'capitalize',
                fontSize: 'md',
              }}
              my={1}
              mr={1}
              key={x.id}>
              {x.name}
            </CustomBadge>
            // </Box>
          ))}
        </HStack>
      </ScrollView>
    </Box>
  );
};

export default PostScreen;
