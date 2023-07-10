import Loader from 'assets/loader.gif';
import {Box, Image} from 'native-base';
import React from 'react';

const FullScreenLoader = () => {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      zIndex={100}
      h="100%"
      w="100%"
      bg="rgba(255, 255, 255, 0.9)"
      justifyContent="center"
      alignItems="center">
      <Image source={Loader} alt="loader" />
    </Box>
  );
};

export default FullScreenLoader;
