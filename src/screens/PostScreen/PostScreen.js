import CustomBadge from '@components/CustomBadge/CustomBadge';
import CustomText from '@components/CustomText/CustomText';
import {IMAGE_DIRECTORY} from '@utils/Urls';
import {COLORS} from '@utils/colors';
import {Box, Divider, HStack, Image, ScrollView} from 'native-base';
import React, {useRef} from 'react';
import Video from 'react-native-video';

const PostScreen = ({
  route: {
    params: {description, media, status, date, categories, _id},
  },
  ...props
}) => {
  const ref = useRef(null);
  return (
    <ScrollView>
      <Box bg={COLORS.bg} px={4} py={6} h="100%">
        { media?.type?.includes('video') ? (
          <Video
            ref={ref}
            // onLoad={load => {
            //   console.log({load});
            // }}
            controls
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
          <Image
            source={{
              uri: media
                ? IMAGE_DIRECTORY + media?.pathname
                : 'https://placehold.co/600x400/png?text=No+Photo',
            }}
            // w="100%"
            h={200}
            resizeMode="cover"
            alt={description}
          />
        )}
        <HStack alignItems="center" my={3} justifyContent="space-between">
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
            Posted On: {new Date(date)?.toLocaleString()}
          </CustomText>
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
              key={x}>
              {x}
            </CustomBadge>
            // </Box>
          ))}
        </HStack>
      </Box>
    </ScrollView>
  );
};

export default PostScreen;
