import CustomText from '@components/CustomText/CustomText';
import Google from 'assets/google-btn-logo.png';
import {Button, Center, HStack, Image} from 'native-base';
import React from 'react';
const GoogleButton = props => {
  return (
    <Button
      {...props}
      bg="#fff"
      _hover={{bg: '#fff'}}
      _active={{bg: '#fff'}}
      _focus={{bg: '#fff'}}
      borderRadius={4}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      _pressed={{bg: '#fff', transform: [{translateY: 1}]}}
      //   px={4}
      //   py={2}
      shadow={2}
      shadowColor="#000"
      shadowOffset={{width: 0, height: 2}}
      shadowOpacity={0.3}>
      <Center>
        <HStack>
          <Image mr={4} source={Google} alt="Google" />
          <CustomText color="#0D103D" fontWeight="bold">
            Google
          </CustomText>
        </HStack>
      </Center>
    </Button>
  );
};

export default GoogleButton;
