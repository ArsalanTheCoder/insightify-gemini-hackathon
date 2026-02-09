import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/AuthContext';
import { AVATARS } from '../../utils/avatars';

export default function SettingsScreen({ navigation }) {
  const { logout } = useContext(AuthContext);

  /* ---------------- LOCAL UI STATE ---------------- */
  const [settings, setSettings] = useState({
    profilePublic: true,
    showOnLeaderboard: true,
    anonymousReports: false,

    notificationsEnabled: true,
    scamAlerts: true,
    achievements: true,
    leaderboardUpdates: false,

    darkMode: false,
    lowDataMode: false,
  });

  const toggle = (key) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

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

        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= ACCOUNT ================= */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.profileRow}>
            <Image
              source={AVATARS.image1} // ✅ Muhammad Maaz
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>Muhammad Maaz</Text>
              <Text style={styles.email}>mohammad.maaz@gmail.com</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
              style={styles.editBtn}
            >
              <Icon name="create-outline" size={18} color="#2563EB" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= PRIVACY & SECURITY ================= */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>

          <SettingToggle
            icon="eye-outline"
            title="Public Profile"
            value={settings.profilePublic}
            onToggle={() => toggle('profilePublic')}
          />

          <SettingToggle
            icon="trophy-outline"
            title="Show on Leaderboard"
            value={settings.showOnLeaderboard}
            onToggle={() => toggle('showOnLeaderboard')}
          />

          <SettingToggle
            icon="shield-checkmark-outline"
            title="Anonymous Reports"
            value={settings.anonymousReports}
            onToggle={() => toggle('anonymousReports')}
          />
        </View>

        {/* ================= NOTIFICATIONS ================= */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <SettingToggle
            icon="notifications-outline"
            title="Enable Notifications"
            value={settings.notificationsEnabled}
            onToggle={() => toggle('notificationsEnabled')}
          />

          <SettingToggle
            icon="alert-circle-outline"
            title="Scam Alerts"
            value={settings.scamAlerts}
            onToggle={() => toggle('scamAlerts')}
          />

          <SettingToggle
            icon="medal-outline"
            title="Achievements"
            value={settings.achievements}
            onToggle={() => toggle('achievements')}
          />

          <SettingToggle
            icon="stats-chart-outline"
            title="Leaderboard Updates"
            value={settings.leaderboardUpdates}
            onToggle={() => toggle('leaderboardUpdates')}
          />
        </View>

        {/* ================= APP EXPERIENCE ================= */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>App Experience</Text>

          <SettingToggle
            icon="moon-outline"
            title="Dark Mode"
            value={settings.darkMode}
            onToggle={() => toggle('darkMode')}
          />

          <SettingToggle
            icon="cellular-outline"
            title="Low Data Mode"
            value={settings.lowDataMode}
            onToggle={() => toggle('lowDataMode')}
          />
        </View>

        {/* ================= SUPPORT & LEGAL ================= */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Support & Legal</Text>

          <SettingLink icon="help-circle-outline" title="Help & FAQs" />
          <SettingLink icon="mail-outline" title="Contact Support" />
          <SettingLink icon="document-text-outline" title="Privacy Policy" />
          <SettingLink icon="information-circle-outline" title="About Insightify" />
        </View>

        {/* ================= LOGOUT ================= */}
        <View style={[styles.card, styles.dangerCard]}>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => {
              Alert.alert(
                'Log Out',
                'Are you sure you want to log out?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Log Out',
                    style: 'destructive',
                    onPress: async () => {
                      await logout();
                    },
                  },
                ]
              );
            }}
          >
            <Icon name="log-out-outline" size={18} color="#EF4444" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function SettingToggle({ icon, title, value, onToggle }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <Icon name={icon} size={20} color="#2563EB" />
        <Text style={styles.rowTitle}>{title}</Text>
      </View>
      <Switch value={value} onValueChange={onToggle} />
    </View>
  );
}

function SettingLink({ icon, title }) {
  return (
    <TouchableOpacity style={styles.row}>
      <View style={styles.rowLeft}>
        <Icon name={icon} size={20} color="#2563EB" />
        <Text style={styles.rowTitle}>{title}</Text>
      </View>
      <Icon name="chevron-forward" size={18} color="#94A3B8" />
    </TouchableOpacity>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFF',
    paddingHorizontal: 16,
  },

  header: {
    marginTop: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginTop: 14,
    shadowColor: '#2563EB',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  dangerCard: {
    borderWidth: 1,
    borderColor: '#FEE2E2',
    backgroundColor: '#FFF5F5',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },
  name: {
    fontWeight: '800',
    color: '#0F172A',
  },
  email: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  editBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#EEF4FF',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTitle: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '800',
    color: '#EF4444',
  },
});
