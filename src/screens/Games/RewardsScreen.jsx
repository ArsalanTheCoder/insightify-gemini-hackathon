import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* ---------------- MOCK REWARDS ---------------- */

const REWARDS = [
  { id: '1', title: 'XP Bonus', value: '+50 XP', icon: '⚡' },
  { id: '2', title: 'Achievement', value: 'Scam Buster', icon: '🏆' },
  { id: '3', title: 'Streak Boost', value: '+1 Day', icon: '🔥' },
  { id: '4', title: 'Rank Points', value: '+120', icon: '📈' },
];

export default function RewardsScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.rewardCard}>
      <Text style={styles.rewardIcon}>{item.icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.rewardTitle}>{item.title}</Text>
        <Text style={styles.rewardValue}>{item.value}</Text>
      </View>
      <Ionicons name="checkmark-circle" size={22} color="#22C55E" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* TOP */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎁 Rewards Earned</Text>
        <Text style={styles.headerSub}>
          Great job! Here’s what you unlocked
        </Text>
      </View>

      {/* LIST */}
      <FlatList
        data={REWARDS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />

      {/* ACTION */}
      <TouchableOpacity
        style={styles.doneBtn}
        onPress={() => navigation.navigate('QuizHome')}
      >
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFF',
    padding: 20,
  },

  header: {
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
  },

  headerSub: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 4,
  },

  rewardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#2563EB',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  rewardIcon: {
    fontSize: 26,
    marginRight: 14,
  },

  rewardTitle: {
    fontWeight: '800',
    color: '#0F172A',
  },

  rewardValue: {
    color: '#2563EB',
    fontWeight: '800',
    marginTop: 4,
  },

  doneBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },

  doneText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
  },
});
