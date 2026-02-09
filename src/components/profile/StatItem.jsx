import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatItem({ value, label }) {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  value: {
    fontSize: 20,
    fontWeight: '800',
    color: '#222',
  },
  label: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
});
