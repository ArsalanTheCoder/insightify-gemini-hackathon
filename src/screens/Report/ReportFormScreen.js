// src/screens/Report/ReportFormScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ReportFormScreen({ navigation }) {
  const [type, setType] = useState('SMS');
  const [category, setCategory] = useState('Banking');
  const [severity, setSeverity] = useState('Medium');
  const [message, setMessage] = useState('');

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Icon name="arrow-back" size={22} color="#2563EB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scam Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* TYPE */}
        <Text style={styles.label}>Scam Source</Text>
        <View style={styles.row}>
          {['SMS', 'Call', 'Email', 'WhatsApp', 'Link'].map((item) => (
            <Chip
              key={item}
              label={item}
              active={type === item}
              onPress={() => setType(item)}
            />
          ))}
        </View>

        {/* CATEGORY */}
        <Text style={styles.label}>Scam Category</Text>
        <View style={styles.row}>
          {['Banking', 'Job', 'Lottery', 'Loan', 'Crypto'].map((item) => (
            <Chip
              key={item}
              label={item}
              active={category === item}
              onPress={() => setCategory(item)}
            />
          ))}
        </View>

        {/* MESSAGE */}
        <Text style={styles.label}>Scam Message / Description</Text>
        <TextInput
          placeholder="Paste the scam message or describe the incident..."
          value={message}
          onChangeText={setMessage}
          multiline
          style={styles.input}
        />

        {/* SEVERITY */}
        <Text style={styles.label}>Severity Level</Text>
        <View style={styles.row}>
          {['Low', 'Medium', 'High'].map((item) => (
            <Chip
              key={item}
              label={item}
              active={severity === item}
              onPress={() => setSeverity(item)}
            />
          ))}
        </View>

        {/* SUBMIT */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() =>
            navigation.replace('ReportSuccess', { confidence: 82.3 })
          }
        >
          <Text style={styles.submitText}>Submit Report</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

/* CHIP COMPONENT */
function Chip({ label, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={active ? styles.chipTextActive : styles.chipText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF', padding: 16 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '900',
  },

  label: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: '800',
    color: '#0F172A',
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  chipText: { fontWeight: '700', color: '#0F172A' },
  chipTextActive: { fontWeight: '800', color: '#FFFFFF' },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    minHeight: 120,
    textAlignVertical: 'top',
  },

  submitBtn: {
    marginTop: 26,
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
  },
  submitText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
});
