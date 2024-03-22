// // FormInput.tsx

// import React from 'react';
// import {TextInput, TextInputProps} from 'react-native';

// interface FormInputProps extends TextInputProps {
//   value?: string;
//   onChangeText: (text: string) => void;
//   placeholder?: string;
//   autoFocus?: boolean;
//   // Add more props as needed
// }

// const FormInput: React.FC<FormInputProps> = ({
//   value,
//   onChangeText,
//   ...rest
// }) => {
//   return <TextInput value={value} onChangeText={onChangeText} {...rest} />;
// };

// export default FormInput;
import React from 'react';
import {TextInput, TextInputProps, StyleSheet} from 'react-native';

interface FormInputProps extends TextInputProps {
  value?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  // Add more props as needed
}

const FormInput: React.FC<FormInputProps> = ({
  value,
  onChangeText,
  ...rest
}) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder="First Chracter Must Be Capital"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 44,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 30,
    marginTop: 8,
    marginBottom: 8,
    width: 335,
  },
});

export default FormInput;
