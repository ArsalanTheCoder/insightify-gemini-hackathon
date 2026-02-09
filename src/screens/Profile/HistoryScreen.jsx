import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/* ---------------- MOCK DATA (MORE RECORDS) ---------------- */

const HISTORY_DATA = [
  {
    id: 'h1',
    type: 'report',
    title: 'Reported Phishing Scam',
    desc: 'Fake bank email detected',
    time: '2 hours ago',
    icon: 'alert-circle',
  },
  {
    id: 'h2',
    type: 'achievement',
    title: 'Achievement Unlocked',
    desc: 'Scam Buster',
    time: 'Yesterday',
    icon: 'trophy',
  },
  {
    id: 'h3',
    type: 'rank',
    title: 'Leaderboard Update',
    desc: 'Reached Global Rank #69',
    time: '2 days ago',
    icon: 'trending-up',
  },
  {
    id: 'h4',
    type: 'report',
    title: 'Threat Prevented',
    desc: 'Malicious link blocked',
    time: '4 days ago',
    icon: 'shield-checkmark',
  },
  {
    id: 'h5',
    type: 'achievement',
    title: 'New Badge Earned',
    desc: 'Early Reporter',
    time: '5 days ago',
    icon: 'ribbon',
  },
  {
    id: 'h6',
    type: 'rank',
    title: 'Rank Improved',
    desc: 'Moved up 12 positions',
    time: '1 week ago',
    icon: 'bar-chart',
  },
];

const FILTERS = ['All', 'Reports', 'Achievements', 'Rank'];

/* ---------------- SCREEN ---------------- */

export default function HistoryScreen({ navigation }) {
  const [filter, setFilter] = useState('All');

  const filteredData = HISTORY_DATA.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'Reports') return item.type === 'report';
    if (filter === 'Achievements') return item.type === 'achievement';
    if (filter === 'Rank') return item.type === 'rank';
    return true;
  });

  const renderItem = ({ item }) => {
    const accentColor =
      item.type === 'report'
        ? '#F97316'
        : item.type === 'achievement'
        ? '#FACC15'
        : '#22C55E';

    return (
      <View style={styles.timelineRow}>
        {/* Timeline */}
        <View style={styles.timelineCol}>
          <View style={[styles.dot, { backgroundColor: accentColor }]} />
          <View style={styles.line} />
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* Left Accent */}
          <View style={[styles.leftAccent, { backgroundColor: accentColor }]} />

          {/* Icon */}
          <View
            style={[
              styles.cardLeft,
              { backgroundColor: `${accentColor}20` },
            ]}
          >
            <Icon name={item.icon} size={22} color={accentColor} />
          </View>

          {/* Content */}
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>

          {/* Time */}
          <View style={styles.timeWrap}>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          activeOpacity={0.85}
        >
          <Icon name="arrow-back" size={22} color="#2563EB" />
        </TouchableOpacity>

        <Text style={styles.screenTitle}>Activity History</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* FILTERS */}
      <View style={styles.filtersRow}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[
              styles.filterBtn,
              filter === f && styles.filterActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === f && styles.filterTextActive,
              ]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LIST */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48 }}
      />
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFF',
    paddingHorizontal: 16,
  },

  /* TOP BAR */
  topBar: {
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
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
  },

  /* FILTERS */
  filtersRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5EDFF',
  },
  filterActive: {
    backgroundColor: '#2563EB',
  },
  filterText: {
    fontWeight: '700',
    color: '#2563EB',
    fontSize: 13,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },

  /* TIMELINE */
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineCol: {
    width: 26,
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 14,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: '#E5EDFF',
    marginTop: 4,
  },

  /* CARD */
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },

  leftAccent: {
    width: 4,
    height: '100%',
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    marginRight: 12,
  },

  cardLeft: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  title: {
    fontWeight: '800',
    color: '#0F172A',
    fontSize: 14,
  },
  desc: {
    marginTop: 4,
    color: '#64748B',
    fontSize: 12,
  },

  timeWrap: {
    paddingLeft: 8,
  },
  time: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
});
