import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ReasonChip({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, selected && styles.active]}
    >
      <Text style={[styles.text, selected && styles.activeText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginRight: 8,
    marginBottom: 8,
  },
  active: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  activeText: { color: '#fff' },
});
