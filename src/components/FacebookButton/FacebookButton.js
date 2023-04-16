import CustomText from '@components/CustomText/CustomText';
import {Button, Center, HStack, Icon, Image} from 'native-base';
import React from 'react';
import Facebook from 'assets/facebook-btn-logo.png';

const FacebookButton = props => {
  return (
    <Button
      {...props}
      bg="#fff"
      _hover={{bg: '#fff'}}
      _active={{bg: '#fff'}}
      _focus={{bg: '#fff'}}
      borderRadius={4}
      //   px={4}
      //   py={2}
      shadow={2}
      shadowColor="#000"
      shadowOffset={{width: 0, height: 2}}
      shadowOpacity={0.3}
      shadowRadius={2}>
      <Center>
        <HStack justifyContent="space-between">
          <Image mr={4} source={Facebook} alt="Facebook" />
          <CustomText color="#0D103D" fontWeight="bold">
            Facebook
          </CustomText>
        </HStack>
      </Center>
    </Button>
  );
};

export default FacebookButton;
