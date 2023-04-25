import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const HeaderBackground = () => {
  return (
    <LinearGradient
      colors={['#72439A', '#13C2EE']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{flex: 1}}
    />
  );
};

export default HeaderBackground;
