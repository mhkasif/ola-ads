import {View, Text} from 'react-native';
import React from 'react';
import {Box, Button, IButtonProps, IBoxProps} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import CustomText, { ICustomTextProps } from '@components/CustomText/CustomText';
//create interface
interface ICustomButtonProps extends IBoxProps {
  buttonProps?: IButtonProps;
  secondary?: boolean;
textProps?: ICustomTextProps;
}
const CustomButton = ({
  buttonProps,
  children,
  secondary,
  textProps,
  ...props
}: ICustomButtonProps) => {
  return (
    <Box
      overflow="hidden"
      borderRadius={4}
      bg={
        secondary
          ? 'white'
          : {
              linearGradient: {
                colors: ['#72439A', '#13C2EE'],
                start: [0, 0],
                end: [1, 1],
                locations: [0.1747, 1.461],
              },
            }
      }
      {...props}>
      <Button
        style={{
          backgroundColor: 'transparent',
        }}
        {...buttonProps}>
        <CustomText color={secondary ? 'gray.900' : '#fff'} fontSize="md" {...textProps}

        >
          {children}
        </CustomText>
      </Button>
    </Box>
  );

  // return <Button {...buttonProps}>{children}</Button>;
};

export default CustomButton;
