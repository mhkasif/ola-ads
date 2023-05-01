import CustomText from '@components/CustomText/CustomText';
import LinearGradeientWrapper from '@components/LinearGradeientWrapper/LinearGradeientWrapper';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';

const FAB = ({children, ...props}) => {
  return (
    <Pressable onPress={props.onPress}>
      <LinearGradeientWrapper
        style={styles.container}
        colors={['#72439A', '#13C2EE']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        locations={[0.1747, 1.461]}>
        <CustomText style={styles.title}>{children}</CustomText>
      </LinearGradeientWrapper>
    </Pressable>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    position: 'absolute',
    bottom: 70,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#26653A',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
