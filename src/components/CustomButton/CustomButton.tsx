import {View, Text} from 'react-native';
import React from 'react';
import {Box, Button, IButtonProps, IBoxProps} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import CustomText, {ICustomTextProps} from '@components/CustomText/CustomText';
//create interface
interface ICustomButtonProps extends IBoxProps {
  buttonProps?: IButtonProps;
  secondary?: boolean;
  noGradient?: boolean;
  textProps?: ICustomTextProps;
}
const CustomButton = ({
  buttonProps,
  children,
  secondary,
  textProps,
  noGradient = false,
  ...props
}: ICustomButtonProps) => {
  return noGradient ? (
    <Button
      _disabled={{
        opacity: 0.4,
      }}
      _loading={{
        _text: {
          fontSize: 'md',
          color: secondary ? 'gray.900' : '#fff',
        },
      }}
      {...buttonProps}>
      <CustomText
        // px={2}
        color={secondary ? 'gray.900' : '#fff'}
        fontSize="md"
        {...textProps}>
        {children}
      </CustomText>
    </Button>
  ) : (
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
        _loading={{
          _text: {
            fontSize: 'md',
            color: secondary ? 'gray.900' : '#fff',
          },
        }}
        {...buttonProps}
        _pressed={{
          // transform: [{translateY: 1}],
          ...(buttonProps?._pressed || {}),
        }}>
        <CustomText
          // px={2}
          color={secondary ? 'gray.900' : '#fff'}
          fontSize="md"
          {...textProps}>
          {children}
        </CustomText>
      </Button>
    </Box>
  );

  // return <Button {...buttonProps}>{children}</Button>;
};

export default CustomButton;
