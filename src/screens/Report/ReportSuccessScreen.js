// src/screens/Report/ReportSuccessScreen.js
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ReportSuccessScreen({ route, navigation }) {
  const { confidence = 82.3 } = route.params || {};
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      {/* SUCCESS ICON */}
      <Animated.View style={[styles.iconWrap, { transform: [{ scale: scaleAnim }] }]}>
        <Icon name="checkmark-circle" size={72} color="#2563EB" />
      </Animated.View>

      {/* TITLE */}
      <Text style={styles.title}>Report Submitted</Text>
      <Text style={styles.subtitle}>
        Thank you for helping keep the community safe
      </Text>

      {/* RESULT CARD */}
      <View style={styles.resultCard}>
        <Text style={styles.resultLabel}>Scam Probability</Text>

        <View style={styles.percentRow}>
          <Text style={styles.percent}>{confidence}%</Text>
          <Text style={styles.risk}>High Risk</Text>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${confidence}%` }]} />
        </View>

        <Text style={styles.explain}>
          Based on scam patterns reported by other users and AI analysis.
        </Text>
      </View>

      {/* IMPACT */}
      <View style={styles.impactCard}>
        <Icon name="people-outline" size={20} color="#2563EB" />
        <Text style={styles.impactText}>
          Your report may appear in the feed to warn other users.
        </Text>
      </View>

      {/* ACTIONS */}
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigation.replace('ReportHome')}
      >
        <Text style={styles.primaryText}>Report Another Scam</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => navigation.navigate('Feed')}
      >
        <Text style={styles.secondaryText}>Go to Feed</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
    padding: 20,
  },

  iconWrap: {
    marginTop: 30,
  },

  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 12,
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 6,
    marginBottom: 24,
  },

  resultCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    elevation: 4,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  percentRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 8,
  },
  percent: {
    fontSize: 36,
    fontWeight: '900',
    color: '#2563EB',
  },
  risk: {
    marginLeft: 8,
    fontWeight: '800',
    color: '#DC2626',
  },

  progressTrack: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
  },

  explain: {
    marginTop: 10,
    fontSize: 12,
    color: '#64748B',
  },

  impactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F1FF',
    padding: 14,
    borderRadius: 14,
    marginTop: 18,
  },
  impactText: {
    marginLeft: 10,
    fontSize: 13,
    fontWeight: '600',
    color: '#1E3A8A',
    flex: 1,
  },

  primaryBtn: {
    marginTop: 26,
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    width: '100%',
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },

  secondaryBtn: {
    marginTop: 12,
    paddingVertical: 14,
  },
  secondaryText: {
    color: '#2563EB',
    fontWeight: '800',
    fontSize: 15,
  },
});
