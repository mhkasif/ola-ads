import {View, Text} from 'react-native';
import React from 'react';
import {Badge, IBadgeProps} from 'native-base';
import {COLORS} from '@utils/colors';
import CustomText, {ICustomTextProps} from '@components/CustomText/CustomText';
interface ICustomBadge extends IBadgeProps {
  textProps?: ICustomTextProps;
}
const CustomBadge = ({children, textProps, ...props}: ICustomBadge) => {
  return (
    <Badge
      bg={COLORS.primary}

      borderRadius={6}
      // py={1}
      // px={2}
      {...props}>
      <CustomText fontSize="xs" color={COLORS.white} {...textProps}>{children}</CustomText>
    </Badge>
  );
};

export default CustomBadge;
