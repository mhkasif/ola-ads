import {View, Text} from 'react-native';
import React from 'react';
import {Box, Icon, Pressable} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import MaterialIcon from '@components/MaterialIcon/MaterialIcon';
import {StyleSheet} from 'react-native';
import {COLORS, linearGradient} from '@utils/colors';
import CustomText from '@components/CustomText/CustomText';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    height: 100,

    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  backIcon: {position: 'absolute', left: 15},
  title: {fontSize: 20, fontWeight: 'bold', color: COLORS.white},
  headerRight: {position: 'absolute', right: 15},
  //   backIcon: {marginRight: 10,color:"#fff"},
});
const CustomHeader = ({title = 'hello', options = {}, ...props}) => {
  console.log({header: {props, bi:options.backIcon}});
  const {headerRight, backIcon = backIcon === undefined} = options;
  const {goBack} = useNavigation();
  return (
    <Box style={styles.container} h={100} bg={{linearGradient}}>
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
  );
};

export default CustomHeader;
