import {Text} from 'native-base';

const CustomText = ({children, ...props}) => {
  return (
    <Text  {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
