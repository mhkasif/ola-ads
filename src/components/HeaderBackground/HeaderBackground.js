import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const HeaderBackground = () => {
  return (
    <LinearGradient
      colors={['rgba(11, 114, 140, 0.83)', '#08576A', '#191E6D', '#543073']}
      // // colors={['#72439A', '#13C2EE']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 0}}
      // locations={[0.0066, 0.0067, 0.4389, 0.9611]}

      // style={styles.gradient}
      style={{flex: 1}}
    />
  );
};

export default HeaderBackground;
