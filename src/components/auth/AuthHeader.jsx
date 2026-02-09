import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AuthHeader({
  brand = 'Insightify',
  subtitleLine1 = 'Create Your Secure Account',
  subtitleLine2 = 'Join Insightify and stay ahead of AI scams',
}) {
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <View style={styles.logoWrap}>
          <Icon name="shield-outline" size={22} />
        </View>
        <Text style={styles.brand}>{brand}</Text>
      </View>

      <Text style={styles.muted}>AI-Powered Scam Detection</Text>

      <View style={{ marginTop: 12 }}>
        <Text style={styles.titleLite}>{subtitleLine1}</Text>
        <Text style={styles.subtitle}>{subtitleLine2}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  brand: {
    fontSize: 18,
    fontWeight: '700',
  },
  muted: {
    fontSize: 12,
    color: '#9b9b9b',
    marginTop: 6,
  },
  titleLite: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  subtitle: {
    fontSize: 13,
    color: '#7a7a7a',
    marginTop: 4,
  },
});
