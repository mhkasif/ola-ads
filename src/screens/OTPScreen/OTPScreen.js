import React, {useState, useRef} from 'react';
import {
View,
TextInput,
StyleSheet,
TouchableOpacity,
Text,
Keyboard,
} from 'react-native';

const OtpScreen = () => {
const [otp, setOtp] = useState(['', '', '', '']);
const inputRefs = useRef([]);
const handleSubmit = () => {
Keyboard.dismiss();
console.log('OTP:', otp.join(''));
};
const focusPrevious = id => {
if (id === 0) {
return;
}
inputRefs.current[id - 1].focus();
};
const focusNext = id => {
if (id === otp.length - 1) {
handleSubmit();
return;
}
inputRefs.current[id + 1].focus();
};
const handleTextChange = (text, id) => {
if (!/^\d+$/.test(text)) {
return;
}
const newOtp = [...otp];
newOtp[id] = text;
setOtp(newOtp);
if (text) {
focusNext(id);
}
};
const handleBackspace = (e, id) => {
const {nativeEvent} = e;
if (nativeEvent.key === 'Backspace' && !otp[id]) {
focusPrevious(id);
}
};
const renderInputs = () => {
const inputs = [];
for (let i = 0; i < otp.length; i++) {
inputs.push(
<View style={styles.inputWrapper} key={i}>
<TextInput
ref={ref => {
inputRefs.current[i] = ref;
}}
style={styles.input}
value={otp[i]}
maxLength={1}
keyboardType="number-pad"
onChangeText={text => handleTextChange(text, i)}
onKeyPress={e => handleBackspace(e, i)}
/>
</View>,
);
}
return inputs;
};

return (
<View style={styles.container}>
<Text style={styles.title}>Enter OTP</Text>
<View style={styles.inputContainer}>{renderInputs()}</View>
<TouchableOpacity style={styles.button} onPress={handleSubmit}>
<Text style={styles.buttonText}>Submit</Text>
</TouchableOpacity>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
paddingHorizontal: 20,
},
title: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 40,
},
inputContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
width: '80%',
marginBottom: 50,
},
inputWrapper: {
borderWidth: 1,
borderColor: '#000',
borderRadius: 5,
width: 50,
height: 50,
justifyContent: 'center',
alignItems: 'center',
},
input: {
fontSize: 24,
textAlign: 'center',
},
button: {
backgroundColor: '#000',
borderRadius: 10,
paddingVertical: 10,
paddingHorizontal: 20,
},
buttonText: {
color: '#fff',
fontWeight: 'bold',
fontSize: 18,
},
});

export default OtpScreen;