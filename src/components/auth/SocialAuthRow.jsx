import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SocialAuthRow({ onGoogle, onApple, onLinkedIn }) {
  return (
    <View style={styles.container}>
      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.orText}>or continue with</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.iconsRow}>
        <TouchableOpacity style={styles.circle} onPress={onGoogle}>
          <Icon name="logo-google" size={22} />
          <Text style={styles.iconLabel}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.circle} onPress={onApple}>
          <Icon name="logo-apple" size={22} />
          <Text style={styles.iconLabel}>Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.circle} onPress={onLinkedIn}>
          <Icon name="logo-linkedin" size={22} />
          <Text style={styles.iconLabel}>LinkedIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 12 },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e6e6e6',
  },
  orText: {
    marginHorizontal: 12,
    fontSize: 13,
    color: '#9b9b9b',
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  circle: {
    width: 98,
    height: 74,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 6,
    marginHorizontal: 4,
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 6,
    color: '#666',
  },
});
