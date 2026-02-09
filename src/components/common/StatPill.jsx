import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatPill({ icon, label }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    marginRight: 8,
  },
  icon: {
    marginRight: 6,
    fontSize: 14,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
});
