import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SectionTitle({ title, actionText, onPress, style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>

      {actionText && (
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.actionBtn,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.actionText}>{actionText}</Text>
          <Icon name="chevron-forward" size={14} color="#2563EB" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
  },

  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF4FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  pressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
  actionText: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '800',
    marginRight: 4,
  },
});
