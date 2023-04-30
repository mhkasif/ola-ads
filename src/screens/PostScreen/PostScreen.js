import CustomBadge from '@components/CustomBadge/CustomBadge';
import CustomText from '@components/CustomText/CustomText';
import {COLORS} from '@utils/colors';
import {Box, Divider, HStack, Heading, Image} from 'native-base';
import React from 'react';
import PostImage from '../../assets/postImage.png';
import { useFocusEffect } from '@react-navigation/native';
const PostScreen = ({
  route: {
    params: {
      status = 'approved',
      title = 'We Are Hiring Lets Join Our Team Now',
      img,
    },
  },
  ...props
}) => {

  return (
    <Box bg={COLORS.bg} px={4} py={6}>
      <Image source={img || PostImage} w="100%" alt={title} />
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
          Posted On: 13/May/2023 12:45 PM
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
      <Heading w="80%" my={2}>
        {title}
      </Heading>

      <CustomText fontSize="sm" mb={4} color={COLORS.muted}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia nulla
        nihil repellendus laudantium, quibusdam consequuntur recusandae sit non
        dicta? Esse excepturi modi laborum eaque dignissimos rem ad in velit
        soluta.
      </CustomText>

      <Divider my={4} />

      <CustomText mb={3} fontSize="lg">
        Posted Groups:
      </CustomText>
      <HStack my={1} flexWrap="wrap" flexDirection="row">
        {Array(6)
          .fill('Group')
          .map((x, i) => (
            // <Box key={x + i}>
            <CustomBadge
              size="lg"
              textProps={{
                textTransform: 'capitalize',
                fontSize: 'md',
              }}
              my={1}
              mr={1}
              key={x + i}>{`${x} ${i + 1}`}</CustomBadge>
            // </Box>
          ))}
      </HStack>
    </Box>
  );
};

export default PostScreen;
