import React, { useEffect, useRef } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Share,
} from 'react-native';

/* ---------------- SCREEN ---------------- */

export default function ChampionScreen({ route, navigation }) {
  const { user = {}, rank = 1, scope = 'Global' } = route.params || {};

  // Derived stats
  const verifications = Math.max(1, Math.floor((user.score || 0) / 10000));
  const reports = Math.max(0, Math.floor((user.score || 0) / 30000));
  const accuracy = Math.min(100, Math.floor(((user.score || 0) % 10000) / 100));

  // Animations
  const scale = useRef(new Animated.Value(0.85)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const btnScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  /* ---------- SAFE AVATAR HANDLER ---------- */
  const getAvatarSource = (avatar) => {
    if (typeof avatar === 'number') {
      return avatar; // local require
    }
    return { uri: avatar }; // remote
  };

  const onShare = async () => {
    try {
      const text = `${user.name} is #${rank} on Insightify (${scope}) — ${user.score?.toLocaleString() || 0} pts.`;
      await Share.share({ message: text });
    } catch {}
  };

  const onPressBack = () => {
    Animated.sequence([
      Animated.timing(btnScale, { toValue: 0.94, duration: 80, useNativeDriver: true }),
      Animated.timing(btnScale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start(() => navigation.goBack());
  };

  const progress = Math.min(1, ((user.score || 0) % 100000) / 100000);

  return (
    <SafeAreaView style={styles.safe}>
      <Animated.View style={[styles.container, { opacity: fade, transform: [{ scale }] }]}>

        {/* TOP BAR */}
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Icon name="arrow-back" size={24} color="#2563EB" />
          </TouchableOpacity>

          <View style={{ flex: 1 }} />

          <TouchableOpacity onPress={onShare} style={styles.shareBtn}>
            <Icon name="share-social" size={24} color="#d23434" />
          </TouchableOpacity>
        </View>

        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.crownWrap}>
            <Text style={styles.crown}>👑</Text>
          </View>

          <Image source={getAvatarSource(user.avatar)} style={styles.avatar} />

          <Text style={styles.name}>{user.name || 'Champion'}</Text>
          <Text style={styles.sub}>{scope} · Rank #{rank}</Text>

          <View style={styles.pointsBox}>
            <Text style={styles.points}>{(user.score || 0).toLocaleString()}</Text>
            <Text style={styles.pointsLabel}>Awareness Points</Text>
          </View>

          <View style={styles.progressOuter}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {Math.round(progress * 100)}% to next milestone
          </Text>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{verifications}</Text>
            <Text style={styles.statLabel}>Verifications</Text>
          </View>
          <View style={[styles.stat, styles.statMiddle]}>
            <Text style={styles.statValue}>{reports}</Text>
            <Text style={styles.statLabel}>Reports</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{accuracy}%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.actions}>
          <AnimatedTouchable
            style={[styles.btnPrimary, { transform: [{ scale: btnScale }] }]}
            onPress={onPressBack}
          >
            <Text style={styles.btnPrimaryText}>Back</Text>
          </AnimatedTouchable>

          <TouchableOpacity style={styles.btnGhost} onPress={onShare}>
            <Text style={styles.btnGhostText}>Share Profile</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

/* Animated Touchable */
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7FAFF' },

  container: {
    flex: 1,
    padding: 18,
    justifyContent: 'flex-start',
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
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
    elevation: 3,
  },
  backText: { fontSize: 18, color: '#2563EB', fontWeight: '800' },

  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EEF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { fontSize: 16 },

  hero: {
    marginTop: 14,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 18,
    shadowColor: '#2563EB',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 6,
  },

  crownWrap: {
    position: 'absolute',
    top: -18,
    right: 22,
    backgroundColor: '#FFF6E6',
    padding: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FACC15',
    shadowColor: '#FACC15',
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  crown: { fontSize: 18 },

  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 12, borderWidth: 3, borderColor: '#EEF4FF' },
  name: { fontSize: 20, fontWeight: '900', color: '#0F172A' },
  sub: { fontSize: 13, color: '#64748B', marginTop: 4 },

  pointsBox: {
    marginTop: 12,
    backgroundColor: '#EEF4FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  points: { fontSize: 20, fontWeight: '900', color: '#1E3A8A' },
  pointsLabel: { fontSize: 12, color: '#64748B' },

  progressOuter: {
    height: 8,
    width: '100%',
    marginTop: 14,
    backgroundColor: '#F1F6FF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
  },
  progressText: { marginTop: 8, fontSize: 12, color: '#64748B' },

  statsRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 6,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statMiddle: { marginHorizontal: 8 },
  statValue: { fontWeight: '900', fontSize: 18, color: '#0F172A' },
  statLabel: { fontSize: 12, color: '#64748B', marginTop: 6 },

  actions: {
    marginTop: 22,
    alignItems: 'center',
  },
  btnPrimary: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 16,
    marginBottom: 12,
  },
  btnPrimaryText: { color: '#FFFFFF', fontWeight: '900', fontSize: 15 },

  btnGhost: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E6EEF9',
    backgroundColor: '#FFFFFF',
  },
  btnGhostText: { color: '#2563EB', fontWeight: '800' },
});
