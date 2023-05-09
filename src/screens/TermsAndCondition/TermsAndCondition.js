import {View, Text} from 'react-native';
import React from 'react';
import {Box, Heading} from 'native-base';
import CustomText from '@components/CustomText/CustomText';

const TermsAndCondition = () => {
  return (
    <Box h="100%" w="100%" py={5} px={2}>
      <Heading my={2}>Lorem Ipsum</Heading>
      <CustomText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptates
        architecto ut expedita quis nisi incidunt quas, exercitationem modi
        animi. Nobis debitis beatae sunt impedit cupiditate repellendus
        recusandae necessitatibus repudiandae?
      </CustomText>
      <CustomText mb={4}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptates
        architecto ut expedita quis nisi incidunt quas, exercitationem modi
        animi. Nobis debitis beatae sunt impedit cupiditate repellendus
        recusandae necessitatibus repudiandae?
      </CustomText>
      <CustomText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptates
        architecto ut expedita quis nisi incidunt quas, exercitationem modi
        animi. Nobis debitis beatae sunt impedit cupiditate repellendus
        recusandae necessitatibus repudiandae?
      </CustomText>
    </Box>
  );
};

export default TermsAndCondition;
