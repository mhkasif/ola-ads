import React from 'react';
import {useField, useFormikContext} from 'formik';
import {
  FormControl,
  IInputProps,
  ITextAreaProps,
  Icon,
  Input,
  Pressable,
  TextArea,
  WarningOutlineIcon,
} from 'native-base';
import MaterialIcon from '@components/MaterialIcon/MaterialIcon';

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
      {type === 'password' ? (
        <PasswordInput {...configInputField} />
      ) : type === 'textarea' ? (
        <TextAreaInput {...configInputField} />
      ) : (
        <SimpleInput {...configInputField} />
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
    <SimpleInput
      {...props}
      type={show ? 'text' : 'password'}
      InputRightElement={
        <Pressable onPress={() => setShow(!show)}>
          <Icon
            as={<MaterialIcon name={show ? 'visibility' : 'visibility-off'} />}
            size={5}
            mr="2"
            color="muted.400"
          />
        </Pressable>
      }
    />
  );
};

const TextAreaInput = (props: any) => {
  return (
    <TextArea
      {...props}
      _focus={{
        backgroundColor: 'transparent',
      }}
    />
  );
};

export const SimpleInput = (props: IInputProps) => {
  return (
    <Input
      {...props}
      _focus={{
        backgroundColor: 'transparent',
      }}
    />
  );
};
export default CustomInput;
