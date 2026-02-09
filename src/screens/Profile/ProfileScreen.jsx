import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Card from '../../components/common/Card';
import SectionTitle from '../../components/common/SectionTitle';
import ProgressBar from '../../components/common/ProgressBar';
import StatItem from '../../components/profile/StatItem';
import { AVATARS } from '../../utils/avatars';

/* ---------------- MOCK DATA ---------------- */

const USER = {
  name: 'Muhammad Maaz',
  title: 'AI Awareness Champion',
  xp: 820,
  nextXp: 1000,
  rank: 69,
  // could be local require (AVATARS.image2) or remote URL string
  avatar: AVATARS.image1,
};

const LEADERBOARD_TOP3 = [
  {
    id: 1,
    name: 'Mohammad Arsalan',
    points: 520,
    avatar: AVATARS.image2,
  },
  {
    id: 2,
    name: 'Muhammad Maaz',
    points: 820,
    avatar: AVATARS.image1,
    me: true,
  },
  {
    id: 3,
    name: 'Muhammad Ahmed',
    points: 310,
    avatar: AVATARS.image3,
  },
];

const ACHIEVEMENTS = [
  { id: 1, icon: '🛡️', title: 'Verified', unlocked: true },
  { id: 2, icon: '📢', title: 'Reporter', unlocked: true },
  { id: 3, icon: '👑', title: 'Guardian', unlocked: false },
];

const ACTIVITY = [
  {
    id: 1,
    type: 'report',
    title: 'Reported a Scam',
    desc: 'Phishing bank message detected',
    time: '2h ago',
    icon: 'alert-circle',
  },
  {
    id: 2,
    type: 'achievement',
    title: 'Achievement Unlocked',
    desc: 'Scam Buster',
    time: '1d ago',
    icon: 'trophy',
  },
  {
    id: 3,
    type: 'rank',
    title: 'Leaderboard Update',
    desc: 'Reached Global Rank #69',
    time: '3d ago',
    icon: 'trending-up',
  },
];

/* ---------------- HELPER ---------------- */

/**
 * Normalizes avatar sources so you can pass either:
 *  - a local require(...) (number)  -> returned as-is
 *  - a remote URL string           -> converted to { uri: string }
 */
const normalizeAvatar = (avatar) => {
  if (!avatar) return null;
  // remote URL passed as string
  if (typeof avatar === 'string') return { uri: avatar };
  // object like { uri: '...' } already
  if (typeof avatar === 'object' && avatar.uri) return avatar;
  // local require(...) returns a number -> return as-is
  return avatar;
};

/* ---------------- SCREEN ---------------- */

export default function ProfileScreen({ navigation }) {
  const userAvatarSource = normalizeAvatar(USER.avatar);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* SETTINGS BUTTON */}
      <TouchableOpacity
        style={styles.settingsBtn}
        onPress={() => navigation.navigate('Settings')}
      >
        <Icon name="settings-outline" size={20} color="#2563EB" />
      </TouchableOpacity>

      {/* PROFILE HERO */}
      <View style={styles.header}>
        {/* NOTE: pass normalized source (works for local + remote) */}
        <Image source={userAvatarSource} style={styles.avatar} />
        <Text style={styles.name}>{USER.name}</Text>
        <Text style={styles.title}>{USER.title}</Text>

        <View style={{ width: 170, marginTop: 10 }}>
          <ProgressBar progress={USER.xp / USER.nextXp} height={8} />
        </View>
        <Text style={styles.xpText}>
          {USER.xp} / {USER.nextXp} XP
        </Text>
      </View>

      {/* STATS */}
      <Card style={styles.statsCard}>
        <StatItem value="92%" label="Safety Score" />
        <StatItem value="19" label="Threats Prevented" />
        <StatItem value={`#${USER.rank}`} label="Rank" />
      </Card>

      {/* 🏆 LEADERBOARD PREVIEW */}
      <SectionTitle
        title="Leaderboard"
        actionText="View Full"
        onPress={() => navigation.navigate('Leaderboard')}
      />

      <Card>
        <View style={styles.lbRow}>
          {LEADERBOARD_TOP3.map((user) => {
            const avatarSource = normalizeAvatar(user.avatar);
            return (
              <View
                key={user.id}
                style={[styles.lbItem, user.me && styles.lbItemActive]}
              >
                {user.me && (
                  <Icon name="trophy" size={18} color="#FACC15" style={{ marginBottom: 4 }} />
                )}

                <Image source={avatarSource} style={styles.lbAvatar} />
                <Text style={styles.lbName}>{user.name}</Text>
                <Text style={styles.lbPoints}>{user.points} Points</Text>
              </View>
            );
          })}
        </View>
      </Card>

      {/* 🎖 ACHIEVEMENTS */}
      <SectionTitle title="Achievements" actionText="View All" onPress={() => navigation.navigate('Achievements')} />

      <Card>
        <View style={styles.achRow}>
          {ACHIEVEMENTS.map((a) => (
            <View key={a.id} style={styles.achItem}>
              <View style={[styles.achIconBox, !a.unlocked && styles.achLocked]}>
                <Text style={styles.achIcon}>{a.icon}</Text>
              </View>
              <Text style={[styles.achTitle, !a.unlocked && styles.achTextLocked]}>
                {a.title}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 12 }}>
          <ProgressBar progress={2 / 5} height={6} />
          <Text style={styles.achProgress}>2 of 5 unlocked</Text>
        </View>
      </Card>

      {/* 🕒 RECENT ACTIVITY */}
      <SectionTitle title="Recent Activity" actionText="View History" onPress={() => navigation.navigate('History')} />

      <Card style={{ paddingVertical: 6 }}>
        {ACTIVITY.map((a, index) => (
          <View key={a.id}>
            <View style={styles.activityItem}>
              {/* ICON */}
              <View style={styles.activityIconBox}>
                <Icon name={a.icon} size={18} color="#2563EB" />
              </View>

              {/* TEXT */}
              <View style={{ flex: 1 }}>
                <Text style={styles.activityTitle}>{a.title}</Text>
                <Text style={styles.activityDesc}>{a.desc}</Text>
              </View>

              {/* TIME */}
              <Text style={styles.activityTime}>{a.time}</Text>
            </View>

            {/* DIVIDER */}
            {index !== ACTIVITY.length - 1 && <View style={styles.activityDivider} />}
          </View>
        ))}
      </Card>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFF',
    padding: 16,
  },

  settingsBtn: {
    position: 'absolute',
    right: 20,
    top: 18,
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  header: {
    backgroundColor: '#0056D2',
    borderRadius: 20,
    alignItems: 'center',
    padding: 24,
    marginBottom: 16,
  },
  avatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 10 },
  name: { color: '#fff', fontSize: 20, fontWeight: '800' },
  title: { color: '#E3F2FD', fontSize: 13, marginTop: 4 },
  xpText: { color: '#E3F2FD', fontSize: 11, marginTop: 6 },

  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  /* leaderboard */
  lbRow: { flexDirection: 'row', justifyContent: 'space-between' },
  lbItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  lbItemActive: {
    borderWidth: 1.5,
    borderColor: '#FACC15',
    backgroundColor: '#FFFBEB',
  },
  lbAvatar: { width: 54, height: 54, borderRadius: 27, marginBottom: 6 },
  lbName: { fontWeight: '700', fontSize: 13 },
  lbPoints: { fontSize: 11, color: '#64748B' },

  /* achievements */
  achRow: { flexDirection: 'row', justifyContent: 'space-between' },
  achItem: { alignItems: 'center', flex: 1 },
  achIconBox: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: '#EAF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  achLocked: { backgroundColor: '#F1F5F9', opacity: 0.6 },
  achIcon: { fontSize: 24 },
  achTitle: { marginTop: 6, fontSize: 12, fontWeight: '700' },
  achTextLocked: { color: '#94A3B8' },
  achProgress: { marginTop: 6, fontSize: 11, color: '#64748B' },

  /* RECENT ACTIVITY (IMPROVED) */
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 6,
  },

  activityIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EAF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  activityTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },

  activityDesc: {
    marginTop: 2,
    fontSize: 12,
    color: '#64748B',
  },

  activityTime: {
    fontSize: 11,
    color: '#94A3B8',
    marginLeft: 10,
  },

  activityDivider: {
    height: 1,
    backgroundColor: '#EEF2FF',
    marginLeft: 52,
  },
});
