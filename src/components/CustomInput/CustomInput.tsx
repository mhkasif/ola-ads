import React from 'react';
import {useField, useFormikContext} from 'formik';
import {FormControl, IInputProps, Input, WarningOutlineIcon} from 'native-base';

interface CustomInputProps {
  name: string;
  label: string;
  type?: string;
  inputProps?: IInputProps;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  label,
  type = 'text',
  inputProps = {},
  ...rest
}: CustomInputProps) => {
  const {setFieldValue, setFieldTouched} = useFormikContext();
  const handleChange = (text: string) => {
    setFieldValue(name, text);
  };
  const handleBlur = () => {
    setFieldTouched(name, true);
  };
  const [{onChange, onBlur, ...field}, meta] = useField(name);

  const configInputField: any = {
    type,
    ...field,
    helperText: '',
    onChangeText: handleChange,
    onBlur: handleBlur,
    ...inputProps,
  };
  if (meta && meta.touched && meta.error) {
    configInputField.invalid = true;
    configInputField.helperText = meta.error;
  }

  return (
    <FormControl isInvalid={configInputField.invalid} {...rest}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input {...configInputField} />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {configInputField.helperText}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default CustomInput;
