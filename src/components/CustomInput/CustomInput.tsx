import React from 'react';
import {useField, useFormikContext} from 'formik';
import {
  FormControl,
  IInputProps,
  Icon,
  Input,
  Pressable,
  WarningOutlineIcon,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
  const [show, setShow] = React.useState(false);
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
      {type !== 'password' ? (
        <Input {...configInputField} />
      ) : (
        <PasswordInput {...configInputField} />
      )}
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {configInputField.helperText}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

const PasswordInput: React.FC<CustomInputProps> = ({
  ...props
}: CustomInputProps) => {
  const [show, setShow] = React.useState(false);
  return (
    <Input
    {...props}
      type={show ? 'text' : 'password'}
      InputRightElement={
        <Pressable onPress={() => setShow(!show)}>
          <Icon
            as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
            size={5}
            mr="2"
            color="muted.400"
          />
        </Pressable>
      }
    />
  );
};

export default CustomInput;
