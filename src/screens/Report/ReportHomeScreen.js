// src/screens/Report/ReportHomeScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ReportHomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          activeOpacity={0.85}
        >
          <Icon name="arrow-back" size={22} color="#2563EB" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Report Scam</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* HERO */}
      <View style={styles.heroCard}>
        <Icon name="shield-checkmark-outline" size={34} color="#2563EB" />
        <Text style={styles.heroTitle}>Help Stop Online Scams</Text>
        <Text style={styles.heroSub}>
          Your report helps protect thousands of users from fraud.
        </Text>
      </View>

      {/* INFO */}
      <View style={styles.infoCard}>
        <Icon name="information-circle-outline" size={20} color="#2563EB" />
        <Text style={styles.infoText}>
          Reported scams may appear in the community feed to warn others.
        </Text>
      </View>

      {/* CTA */}
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigation.navigate('ReportForm')}
        activeOpacity={0.9}
      >
        <Icon name="alert-circle-outline" size={20} color="#fff" />
        <Text style={styles.primaryText}>Report a Scam</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    padding: 16,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
  },

  /* HERO */
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: 12,
    color: '#0F172A',
  },
  heroSub: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 6,
  },

  /* INFO */
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F1FF',
    borderRadius: 14,
    padding: 14,
    marginTop: 18,
  },
  infoText: {
    marginLeft: 10,
    color: '#1E3A8A',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },

  /* CTA */
  primaryBtn: {
    marginTop: 28,
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
    marginLeft: 10,
  },
});
