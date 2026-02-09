import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const { width } = Dimensions.get('window');

/* ---------------- MOCK ACHIEVEMENTS DATA ---------------- */
const ACHIEVEMENTS = [
  { id: 'a1', title: 'First Detection', desc: 'Identify your first scam', icon: '🛡️', unlocked: true, points: 10, category: 'Onboarding' },
  { id: 'a2', title: 'Scam Buster', desc: 'Verify 10 scams', icon: '🔥', unlocked: true, points: 50, category: 'Impact' },
  { id: 'a3', title: 'Phishing Fighter', desc: 'Report phishing attempt', icon: '🎣', unlocked: false, points: 30, category: 'Security' },
  { id: 'a4', title: 'Guardian', desc: 'Protect 100 users', icon: '👑', unlocked: false, points: 200, category: 'Impact' },
  { id: 'a5', title: 'Quiz Master', desc: 'Pass 5 quizzes', icon: '🧠', unlocked: true, points: 20, category: 'Learning' },
  { id: 'a6', title: 'Elite Defender', desc: 'Top 5% on leaderboard', icon: '⚔️', unlocked: false, points: 150, category: 'Reward' },
  { id: 'a7', title: 'Early Reporter', desc: 'Be the first to report', icon: '📣', unlocked: true, points: 40, category: 'Impact' },
  { id: 'a8', title: 'Evidence Pro', desc: 'Attach 10 evidences', icon: '📎', unlocked: false, points: 25, category: 'Quality' },
  { id: 'a9', title: 'Community Helper', desc: 'Help 20 users', icon: '🤝', unlocked: false, points: 60, category: 'Social' },
  { id: 'a10', title: 'Consistency', desc: 'Report for 7 days straight', icon: '📆', unlocked: true, points: 35, category: 'Habit' },
  { id: 'a11', title: 'Verification Pro', desc: 'Achieve 90% accuracy', icon: '✔️', unlocked: false, points: 120, category: 'Quality' },
  { id: 'a12', title: 'Speedster', desc: 'Verify within 10 minutes', icon: '⚡', unlocked: false, points: 45, category: 'Impact' },
];

/* ---------------- SCREEN ---------------- */

export default function AchievementsScreen({ navigation }) {
  const [filter, setFilter] = useState('All'); // All / Unlocked / Locked / Category...
  const [items] = useState(ACHIEVEMENTS);

  // entrance animations
  const headerY = useRef(new Animated.Value(-20)).current;
  const heroScale = useRef(new Animated.Value(0.97)).current;

  // per-item animation map stored in ref (not a hook inside renderItem)
  const animMapRef = useRef({});

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerY, { toValue: 0, duration: 420, useNativeDriver: true }),
      Animated.spring(heroScale, { toValue: 1, friction: 6, useNativeDriver: true }),
    ]).start();

    // reset map so items animate again when filter changes
    animMapRef.current = {};
  }, [filter, headerY, heroScale]);

  const unlockedCount = items.filter(i => !!i.unlocked).length;
  const progress = items.length ? unlockedCount / items.length : 0;

  const categories = ['All', 'Unlocked', 'Locked', 'Impact', 'Quality', 'Learning'];

  const filtered = items.filter((it) => {
    if (filter === 'All') return true;
    if (filter === 'Unlocked') return !!it.unlocked;
    if (filter === 'Locked') return !it.unlocked;
    return String(it.category || '') === String(filter);
  });

  /* ---------- render item: fully defensive about strings ---------- */
  const renderCard = ({ item, index }) => {
    // ensure we always have an Animated.Value per item id
    if (!animMapRef.current[item.id]) {
      const a = new Animated.Value(0);
      animMapRef.current[item.id] = a;
      Animated.timing(a, {
        toValue: 1,
        duration: 360,
        delay: Math.min(index, 12) * 60,
        useNativeDriver: true,
      }).start();
    }

    const anim = animMapRef.current[item.id];
    const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] });
    const opacity = anim;

    // coerce all dynamic values to string (safest)
    const iconText = String(item.icon || '🏆');
    const titleText = String(item.title || '');
    const descText = String(item.desc || '');
    const pointsText = `${String(item.points ?? 0)} pts`;
    const categoryText = String(item.category || '');
    const unlocked = !!item.unlocked;

    return (
      <Animated.View key={String(item.id)} style={[styles.cardWrap, { opacity, transform: [{ translateY }] }]}>
        <TouchableOpacity
          activeOpacity={0.92}
          onPress={() => {
            /* placeholder - could open details modal */
          }}
        >
          <View style={[styles.achCard, unlocked ? styles.achUnlocked : styles.achLocked]}>
            <View style={styles.left}>
              <View style={[styles.iconBox, unlocked ? styles.iconBoxUnlocked : styles.iconBoxLocked]}>
                <Text style={styles.iconText}>{iconText}</Text>
              </View>
            </View>

            <View style={styles.mid}>
              <Text style={[styles.achTitle, unlocked && styles.achTitleUnlocked]} numberOfLines={1}>
                {titleText}
              </Text>

              <Text style={styles.achDesc} numberOfLines={2}>
                {descText}
              </Text>

              <View style={styles.metaRow}>
                <Text style={styles.points}>{pointsText}</Text>
                <Text style={styles.category}>{categoryText}</Text>
              </View>
            </View>

            <View style={styles.right}>
              {unlocked ? (
                <View style={styles.unlockedBadge}>
                  <Text style={styles.unlockedText}>{String('Unlocked')}</Text>
                </View>
              ) : (
                <View style={styles.lockWrap}>
                  <Text style={styles.lockText}>{'🔒'}</Text>
                </View>
              )}
            </View>

            {unlocked && <View style={styles.glow} pointerEvents="none" />}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        {/* Back Arrow */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          activeOpacity={0.85}
        >
          <Icon name="arrow-back" size={24} color="#2563EB" />
        </TouchableOpacity>

        <Text style={styles.screenTitle}>{'Achievements'}</Text>

        <View style={{ width: 40 }} />
      </View>

      {/* Header / Hero */}
      <Animated.View style={[styles.heroCard, { transform: [{ translateY: headerY }, { scale: heroScale }] }]}>
        <View style={styles.heroLeft}>
          <Text style={styles.heroTitle}>{'Your Progress'}</Text>
          <Text style={styles.heroSub}>{`${unlockedCount} / ${items.length} unlocked`}</Text>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
          </View>
        </View>

        <View style={styles.heroRight}>
          <View style={styles.stageBadge}>
            <Text style={styles.stageText}>{'Protector'}</Text>
            <Text style={styles.stageSmall}>{'Level 3'}</Text>
          </View>
        </View>
      </Animated.View>

      {/* Filters */}
      <View style={styles.filtersRow}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(c) => String(c)}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: c }) => {
            const label = String(c);
            const active = label === filter;
            return (
              <TouchableOpacity
                key={label}
                style={[styles.filterBtn, active && styles.filterActive]}
                onPress={() => setFilter(label)}
                activeOpacity={0.85}
              >
                <Text style={[styles.filterText, active && styles.filterTextActive]}>{label}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Achievements list */}
      <FlatList
        data={filtered}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48, paddingTop: 12 }}
        ListEmptyComponent={<Text style={styles.empty}>{'No achievements found'}</Text>}
      />
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFF', paddingHorizontal: 16 },

  topBar: {
    marginTop: 12,
    marginBottom: 8,
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
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  backText: { fontSize: 18, color: '#2563EB', fontWeight: '800' },

  screenTitle: { fontSize: 20, fontWeight: '900', color: '#0F172A' },

  heroCard: {
    marginTop: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOpacity: 0.09,
    shadowRadius: 12,
    elevation: 4,
  },
  heroLeft: { flex: 1 },
  heroRight: { marginLeft: 12 },
  heroTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  heroSub: { color: '#64748B', marginTop: 4, fontSize: 13 },

  progressBar: {
    marginTop: 12,
    height: 8,
    backgroundColor: '#EEF4FF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#2563EB' },

  stageBadge: {
    backgroundColor: '#EEF4FF',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  stageText: { color: '#0F172A', fontWeight: '800' },
  stageSmall: { color: '#64748B', fontSize: 11 },

  filtersRow: { marginTop: 12, height: 44 },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#EEF4FF',
  },
  filterActive: { backgroundColor: '#2563EB' },
  filterText: { color: '#0F172A', fontWeight: '700' },
  filterTextActive: { color: '#FFFFFF' },

  cardWrap: { marginBottom: 12 },
  achCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    overflow: 'hidden',
  },

  achUnlocked: {
    borderWidth: 1,
    borderColor: '#E6F0FF',
  },
  achLocked: {
    opacity: 0.65,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },

  left: { width: 56, alignItems: 'center' },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxUnlocked: { backgroundColor: '#EAF4FF' },
  iconBoxLocked: { backgroundColor: '#F1F5F9' },
  iconText: { fontSize: 22 },

  mid: { flex: 1, paddingLeft: 8 },
  achTitle: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  achTitleUnlocked: { color: '#1E3A8A' },
  achDesc: { marginTop: 4, fontSize: 12, color: '#64748B' },

  metaRow: { marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  points: { fontSize: 12, color: '#2563EB', fontWeight: '800' },
  category: { fontSize: 11, color: '#94A3B8' },

  right: { width: 86, alignItems: 'center' },
  unlockedBadge: {
    backgroundColor: '#EAF6FF',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  unlockedText: { color: '#0B7BFF', fontWeight: '800' },

  lockWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockText: { fontSize: 16, color: '#94A3B8' },

  glow: {
    position: 'absolute',
    right: -30,
    top: -18,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(37,99,235,0.08)',
  },

  empty: { textAlign: 'center', marginTop: 40, color: '#64748B' },
});
