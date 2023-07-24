import MaterialIcon from '@components/MaterialIcon/MaterialIcon';
import { COLORS } from '@utils/colors';
import { Box, HStack, Heading, Icon } from 'native-base';
import React from 'react';

const ContactUs = () => {
  return (
    <Box>
      <Heading size="2xl" m={4}>
        Get In Touch
      </Heading>

      <Box mt={5} pl={4} bg="white" py={5} px={2} mx={4}>
        <HStack alignItems="center">
          <Icon
            as={MaterialIcon}
            name="email"
            color={COLORS.primary}
            mr={3}
            size="2xl"></Icon>

          <Heading size="sm">info@Ola-Ads.com</Heading>
        </HStack>
        <HStack alignItems="center" my={5}>
          <Icon
            as={MaterialIcon}
            name="phone"
            color={COLORS.primary}
            mr={3}
            size="2xl"></Icon>

          <Heading size="sm">+44 7949891781</Heading>
        </HStack>
        <HStack alignItems="center">
          <Icon
            as={MaterialIcon}
            name="place"
            color={COLORS.primary}
            mr={3}
            size="2xl"></Icon>

          <Heading size="sm">86-90 Paul Street, UK</Heading>
        </HStack>
      </Box>
    </Box>
  );
};

export default ContactUs;
