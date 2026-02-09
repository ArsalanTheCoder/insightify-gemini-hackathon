import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { AVATARS } from '../../utils/avatars';

/* ---------------- DATA ---------------- */

const LEADERBOARD_DATA = {
  /* ---------------- TEAM ---------------- */
  Team: [
    {
      id: 't1',
      name: 'Mohammad Arsalan',
      score: 96239,
      avatar: AVATARS.image2,
      country: 'PK',
    },
    {
      id: 't2',
      name: 'Muhammad Maaz',
      score: 93410,
      avatar: AVATARS.image1,
      country: 'PK',
    },
    {
      id: 't3',
      name: 'Muhammad Ahmed',
      score: 90120,
      avatar: AVATARS.image3,
      country: 'PK',
    },
    {
      id: 't4',
      name: 'Muhammad Ali',
      score: 87240,
      avatar: AVATARS.image4,
      country: 'PK',
    },
    {
      id: 't5',
      name: 'Ahmed Bator',
      score: 84600,
      avatar: 'https://i.pravatar.cc/150?img=32',
      country: 'US',
    },
  ],

  /* ---------------- LOCAL ---------------- */
  Local: [
    {
      id: 'l1',
      name: 'Muhammad Maaz',
      score: 51230,
      avatar: AVATARS.image1,
      city: 'Lahore',
    },
    {
      id: 'l2',
      name: 'Mohammad Arsalan',
      score: 49890,
      avatar: AVATARS.image2,
      city: 'Islamabad',
    },
    {
      id: 'l3',
      name: 'Muhammad Ahmed',
      score: 47650,
      avatar: AVATARS.image3,
      city: 'Lahore',
    },
    {
      id: 'l4',
      name: 'Muhammad Ali',
      score: 46220,
      avatar: AVATARS.image4,
      city: 'Karachi',
    },
    {
      id: 'l5',
      name: 'Shubana Khan',
      score: 44980,
      avatar: 'https://i.pravatar.cc/150?img=15',
      city: 'Islamabad',
    },
  ],

  /* ---------------- GLOBAL ---------------- */
  Global: [
        {
      id: 'g1',
      name: 'Muhammad Ali',
      score: 155420,
      avatar: AVATARS.image4,
      country: 'PK',
    },
    {
      id: 'g5',
      name: 'Ruksana Ana',
      score: 172300,
      avatar: 'https://i.pravatar.cc/150?img=5',
      country: 'RU',
    },
    {
      id: 'g2',
      name: 'Muskana Jana',
      score: 168900,
      avatar: 'https://i.pravatar.cc/150?img=9',
      country: 'ES',
    },
    {
      id: 'g3',
      name: 'Muhammad Ahmed',
      score: 162100,
      avatar: AVATARS.image3,
      country: 'PK',
    },
    {
      id: 'g4',
      name: 'Lucas Meyer',
      score: 158750,
      avatar: 'https://i.pravatar.cc/150?img=14',
      country: 'FR',
    },
  ],
};


/* ---------------- HELPER ---------------- */

const getAvatarSource = (avatar) => {
  return typeof avatar === 'number' ? avatar : { uri: avatar };
};

/* ---------------- SCREEN ---------------- */

export default function LeaderboardScreen({ navigation }) {
  const [scope, setScope] = useState('Global');
  const DATA = LEADERBOARD_DATA[scope] || [];

  const headerAnim = useRef(new Animated.Value(-40)).current;
  const podiumScale = useRef(new Animated.Value(0.9)).current;
  const animValuesRef = useRef({});

  useEffect(() => {
    animValuesRef.current = {};
    Animated.parallel([
      Animated.timing(headerAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(podiumScale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scope]);

  const renderItem = ({ item, index }) => {
    if (!animValuesRef.current[item.id]) {
      const av = new Animated.Value(0);
      animValuesRef.current[item.id] = av;
      Animated.timing(av, {
        toValue: 1,
        duration: 380,
        delay: index * 60,
        useNativeDriver: true,
      }).start();
    }

    const anim = animValuesRef.current[item.id];

    return (
      <Animated.View
        style={{
          opacity: anim,
          transform: [
            {
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [18, 0],
              }),
            },
          ],
          marginBottom: 14,
        }}
      >
        <TouchableOpacity
          style={styles.rankCard}
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('Champion', {
              user: item,
              rank: index + 1,
              scope,
            })
          }
        >
          <View style={styles.rankInner}>
            <Text style={styles.rank}>#{index + 1}</Text>
            <Image source={getAvatarSource(item.avatar)} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.score}>{item.score.toLocaleString()} pts</Text>
            </View>
            {index < 3 && <Text style={styles.crown}>👑</Text>}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  if (!DATA.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.empty}>No rankings available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <Animated.View style={[styles.headerRow, { transform: [{ translateY: headerAnim }] }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#2563EB" />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.title}>Leaderboard</Text>
          <Text style={styles.subtitle}>Top Insightify Guardians</Text>
        </View>
      </Animated.View>

      {/* TABS */}
      <View style={styles.tabs}>
        {['Team', 'Local', 'Global'].map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setScope(t)}
            style={[styles.tab, scope === t && styles.activeTab]}
          >
            <Text style={[styles.tabText, scope === t && styles.activeText]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* HERO */}
      <Animated.View style={[styles.hero, { transform: [{ scale: podiumScale }] }]}>
        <Image source={getAvatarSource(DATA[0].avatar)} style={styles.heroAvatar} />
        <Text style={styles.heroName}>{DATA[0].name}</Text>
        <Text style={styles.heroScore}>{DATA[0].score.toLocaleString()} pts</Text>
        <Text style={styles.heroMeta}>
          {scope === 'Local'
            ? `📍 ${DATA[0].city || '—'}`
            : `🌍 ${DATA[0].country || '—'}`}
        </Text>
      </Animated.View>

      {/* LIST */}
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFF', paddingHorizontal: 16 },

  headerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  headerText: { marginLeft: 12 },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: { fontSize: 26, fontWeight: '900', color: '#0F172A' },
  subtitle: { fontSize: 13, color: '#64748B' },

  tabs: { flexDirection: 'row', marginBottom: 16 },
  tab: { paddingVertical: 8, paddingHorizontal: 18, borderRadius: 24, backgroundColor: '#EEF4FF', marginRight: 10 },
  activeTab: { backgroundColor: '#2563EB' },
  tabText: { fontWeight: '600', color: '#2563EB' },
  activeText: { color: '#FFF' },

  hero: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 28,
    marginBottom: 20,
  },
  heroAvatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 10 },
  heroName: { fontSize: 18, fontWeight: '800', color: '#1E3A8A' },
  heroScore: { color: '#2563EB', fontWeight: '700', marginTop: 4 },
  heroMeta: { fontSize: 12, color: '#64748B', marginTop: 6 },

  rankCard: { backgroundColor: '#FFF', borderRadius: 20 },
  rankInner: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  rank: { width: 36, fontWeight: '800', color: '#2563EB' },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 14 },
  name: { fontWeight: '700', color: '#0F172A' },
  score: { fontSize: 12, color: '#64748B', marginTop: 2 },
  crown: { fontSize: 20 },

  empty: { textAlign: 'center', marginTop: 40, color: '#64748B' },
});
