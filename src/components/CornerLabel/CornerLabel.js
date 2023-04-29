import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const CornerLabel = ({ children, cornerRadius, alignment = 'right', style }) => {
  const labelHeight = Math.sqrt(Math.pow(cornerRadius, 2) / 2);
  const labelWidth = labelHeight * 2;
  const originOffset = Math.sqrt(Math.pow(labelHeight / 2, 2) / 2);
  const labelHorizontalPosition = -labelWidth / 2 + originOffset;
  const labelVerticalPosition = -labelHeight / 2 + originOffset;

  const labelPosition =
    alignment === 'left'
      ? { left: labelHorizontalPosition, top: labelVerticalPosition }
      : { right: labelHorizontalPosition, top: labelVerticalPosition };

  const labelTransform =
    alignment === 'left'
      ? { transform: [{ rotate: '-45deg' }] }
      : { transform: [{ rotate: '45deg' }] };

  return (
    <View
      style={[
        styles.container,
        labelPosition,
        labelTransform,
        { width: labelWidth, height: labelHeight },
      ]}
    >
      <View style={[styles.label, { height: labelHeight }, style]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
  },
  label: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CornerLabel;
