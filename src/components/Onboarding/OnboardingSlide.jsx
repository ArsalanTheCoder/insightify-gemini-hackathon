import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function OnboardingSlide({
  icon = 'shield-checkmark-outline',
  title,
  subtitle,
  backgroundColor = '#ffffff',
  accent = '#2563EB',
}) {
  const { width } = useWindowDimensions();
  const illusSize = Math.min(220, Math.floor(width * 0.5));

  return (
    <View style={[styles.wrap, { backgroundColor }]}>
      <View style={[styles.illustration, { width: illusSize, height: illusSize }]}>
        <View style={[styles.illusInner, { borderColor: accent }]}>
          <Icon name={icon} size={illusSize * 0.38} color={accent} />
        </View>
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 18,
  },
  illustration: {
    marginTop: 8,
    marginBottom: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illusInner: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textWrap: {
    width: '100%',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6b7280',
    lineHeight: 20,
  },
});
