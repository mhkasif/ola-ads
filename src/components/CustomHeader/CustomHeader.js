import CustomText from '@components/CustomText/CustomText';
import MaterialIcon from '@components/MaterialIcon/MaterialIcon';
import {useNavigation} from '@react-navigation/native';
import {COLORS, linearGradient} from '@utils/colors';
import {Box, Icon, Pressable} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Platform} from 'react-native';
const isIOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    height: isIOS ? 50 : 70,

    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  backIcon: {position: 'absolute', left: 15},
  title: {fontSize: 20, fontWeight: 'bold', color: COLORS.white},
  headerRight: {position: 'absolute', right: 15},
  //   backIcon: {marginRight: 10,color:"#fff"},
});
const CustomHeader = ({title = 'hello', options = {}, ...props}) => {
  // console.log({header: {props, bi:options.backIcon}});
  const {headerRight, backIcon = backIcon === undefined} = options;
  const {goBack} = useNavigation();
  return (
    <Box safeArea bg={{linearGradient}}>
      <Box style={styles.container}>
        {backIcon && (
          <Pressable onPress={goBack} style={styles.backIcon}>
            <Icon
              size="lg"
              color={COLORS.white}
              as={<MaterialIcon name="arrow-back" />}
            />
          </Pressable>
        )}
        <CustomText style={styles.title}>{title}</CustomText>
        {headerRight && (
          <Pressable style={styles.headerRight}>{headerRight}</Pressable>
        )}
      </Box>
    </Box>
  );
};

export default CustomHeader;
