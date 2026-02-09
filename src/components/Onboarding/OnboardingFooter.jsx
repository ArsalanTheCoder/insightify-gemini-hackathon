import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

/**
 * props:
 *  - index (0-based)
 *  - total
 *  - onNext()
 *  - onSkip()
 *  - showGetStarted(boolean)
 *  - primaryLabel (string) optional
 */
export default function OnboardingFooter({
  index = 0,
  total = 3,
  onNext = () => {},
  onSkip = () => {},
  showGetStarted = false,
  primaryLabel = 'Next',
}) {
  const dots = [];
  for (let i = 0; i < total; i++) {
    dots.push(
      <View
        key={i}
        style={[styles.dot, i === index ? styles.dotActive : styles.dotInactive]}
      />
    );
  }

  return (
    <View style={styles.footer}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onSkip}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.dotsRow}>{dots}</View>

        <View style={{ width: 48 }} />
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.secondary} onPress={onSkip}>
          <Text style={styles.secondaryText}>Maybe later</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primary} onPress={onNext}>
          <Text style={styles.primaryText}>{showGetStarted ? 'Get Started' : primaryLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 16,
    paddingHorizontal: 6,
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  skip: {
    color: '#6b7280',
    fontSize: 14,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  dotActive: {
    backgroundColor: '#2563EB',
    width: 18,
    borderRadius: 10,
  },
  dotInactive: {
    backgroundColor: '#e6e7eb',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondary: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e6e7eb',
    backgroundColor: '#fff',
  },
  secondaryText: {
    color: '#6b7280',
    fontWeight: '700',
  },
  primary: {
    flex: 1.3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#2563EB',
  },
  primaryText: {
    color: '#fff',
    fontWeight: '800',
  },
});
