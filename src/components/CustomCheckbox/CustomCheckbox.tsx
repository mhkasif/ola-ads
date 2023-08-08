import React from 'react';
import {useField, useFormikContext} from 'formik';
import {
  Checkbox,
  FormControl,
  ICheckboxProps,
  IInputProps,
  ITextAreaProps,
  Icon,
  Input,
  Pressable,
  TextArea,
  WarningOutlineIcon,
} from 'native-base';
import MaterialIcon from '@components/MaterialIcon/MaterialIcon';
import CustomText from '../CustomText/CustomText';
import {COLORS} from '@utils/colors';

interface CustomCheckboxProps {
  name: string;
  label: string;
  type?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  name,
  label,
  type = 'checkbox',
  ...rest
}: CustomCheckboxProps) => {
  const {setFieldValue, setFieldTouched} = useFormikContext();
  const handleChange = (check: Boolean) => {
    console.log(check);
    setFieldValue(name, check);
  };
  const handleBlur = () => {
    setFieldTouched(name, true);
  };
  const [{onChange, onBlur, ...field}, meta] = useField(name);

  const configInputField: any = {
    type,
    ...field,
    helperText: '',
    onChange: handleChange,
    onBlur: handleBlur,
  };
  if (meta && meta.touched && meta.error) {
    configInputField.invalid = true;
    configInputField.helperText = meta.error;
  }

  return (
    <FormControl isInvalid={configInputField.invalid} {...rest}>
      <SimpleCheckbox {...configInputField}>
        <CustomText>{label}</CustomText>
      </SimpleCheckbox>
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {configInputField.helperText}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export const SimpleCheckbox = (props: ICheckboxProps) => {
  return <Checkbox {...props} />;
};

export default CustomCheckbox;
