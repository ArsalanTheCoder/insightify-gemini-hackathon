// src/components/profile/MedalBadge.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MedalBadge({ rank }) {
  // rank 1 -> gold, 2 -> silver, 3 -> bronze, else -> simple wreath
  let bg = '#FFD700';
  if (rank === 2) bg = '#C0C0C0';
  if (rank === 3) bg = '#CD7F32';
  return (
    <View style={[styles.badge, { borderColor: bg }]}>
      <Text style={[styles.text, { color: bg }]}>{rank <= 3 ? `${rank}º` : ''}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    fontWeight: '800',
    fontSize: 12,
  },
});
