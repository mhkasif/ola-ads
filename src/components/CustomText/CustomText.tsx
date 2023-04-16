import {ITextProps, Text} from 'native-base';
export interface ICustomTextProps extends ITextProps {}
const CustomText = ({children, ...props}: ICustomTextProps) => {
  return <Text {...props}>{children}</Text>;
};

export default CustomText;
