import {View, Text} from 'react-native';
import React from 'react';
import {Box, FormControl} from 'native-base';
import {SimpleInput} from '@components/CustomInput/CustomInput';
import CustomText from '@components/CustomText/CustomText';
import CustomButton from '@components/CustomButton/CustomButton';
import {COLORS} from '@utils/colors';
import Toast from 'react-native-toast-message';
import {sleep} from '@utils/helpers';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from 'screens/screenNames';

const ForgotPasswordScreen = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [isCodeSent, setIsCodeSent] = React.useState(false);
  const {navigate} = useNavigation();
  const handleInputValueChange = value => {
    if (value.length > 6) return;
    setInputValue(value);
  };
  const handleCodeSent = () => {
    Toast.show({
      type: 'success',
      text1: 'Code Sent',
      text2: 'Please check your email',
    });
    setIsCodeSent(true);
  };
  const submitCode = async () => {
    // await sleep(1000);
    navigate(SCREEN_NAMES.MAIN);
  };
  return (
    <Box px={6} pt={10} bg={COLORS.white} w="100%" h="100%">
      <FormControl isRequired>
        <FormControl.Label>Verification Code</FormControl.Label>
        <SimpleInput
        disabled={!isCodeSent}
          value={inputValue}
          onChangeText={handleInputValueChange}
          maxLength={6}
          rightElement={
            <CustomText

              onPress={isCodeSent ? null : handleCodeSent}
              color={isCodeSent ? COLORS.muted : COLORS.prim}
              mx={4}
              bold>
              Get Code
            </CustomText>
          }
        />
        <FormControl.HelperText>
          Enter the 6-digit code sent to your email address
        </FormControl.HelperText>
        <CustomButton
          mt={8}
          buttonProps={{
            isDisabled: inputValue.length < 6&&!isCodeSent,
            onPress: submitCode,
          }}
          // disabled={inputValue.length < 6}
        >
          Submit
        </CustomButton>
        {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        Atleast 6 characters are required.
      </FormControl.ErrorMessage> */}
      </FormControl>
    </Box>
  );
};

export default ForgotPasswordScreen;
