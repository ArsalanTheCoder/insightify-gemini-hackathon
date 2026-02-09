import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ResultBubble({ result, content }) {
  const isSafe = result.risk === 'Safe';
  const isCritical = result.risk === 'Critical';

  const themeColor = isSafe ? '#16A34A' : isCritical ? '#DC2626' : '#F59E0B';
  const softBg = isSafe ? '#ECFDF5' : isCritical ? '#FEF2F2' : '#FFFBEB';

  const icon = isSafe
    ? 'shield-checkmark'
    : isCritical
    ? 'warning'
    : 'alert-circle';

  return (
    <View>
      {/* 🔰 VERDICT */}
      <View style={styles.verdictContainer}>
        <Ionicons name={icon} size={52} color={themeColor} />
        <Text style={[styles.verdictText, { color: themeColor }]}>
          {result.verdict}
        </Text>
        <Text style={styles.subText}>AI Analysis Complete</Text>
      </View>

      {/* 📊 SUMMARY */}
      <View style={[styles.card, { backgroundColor: softBg, borderColor: themeColor }]}>
        <Row label="Risk Level" value={result.risk} color={themeColor} />
        <Row label="Risk Score" value={`${result.score}%`} />
      </View>

      {/* 🧠 EXPLANATION */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>AI Explanation</Text>
        <Text style={styles.reasonText}>{result.reason}</Text>
      </View>

      {/* 📄 CONTENT */}
      {content && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Scanned Content</Text>
          <Text style={styles.contentText}>{content}</Text>
        </View>
      )}
    </View>
  );
}

const Row = ({ label, value, color }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, color && { color }]}>{value}</Text>
  </View>
);


const styles = StyleSheet.create({
  verdictContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  verdictText: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 12,
  },
  subText: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 6,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  label: {
    fontSize: 14,
    color: '#6B7280',
  },

  value: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },

  reasonText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },

  contentText: {
    fontSize: 13,
    color: '#111827',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 10,
    lineHeight: 20,
  },
});
