import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BadgeItem({ icon, title, locked }) {
  return (
    <View style={[styles.card, locked && styles.locked]}>
      <Text style={styles.icon}>{locked ? '🔒' : icon}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  locked: {
    opacity: 0.5,
    backgroundColor: '#F5F5F5',
  },
  icon: {
    fontSize: 26,
    marginBottom: 6,
  },
  title: {
    fontSize: 11,
    textAlign: 'center',
    color: '#555',
  },
});
