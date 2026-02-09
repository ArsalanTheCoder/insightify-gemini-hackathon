import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import AuthInput from '../../components/auth/AuthInput';
import PrimaryButton from '../../components/auth/PrimaryButton';
import { resetPassword } from '../../services/authService';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ RESET PASSWORD HANDLER
  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email.trim());
      Alert.alert(
        'Email Sent',
        'A password reset link has been sent to your email address'
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert('Reset Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <Icon name="shield-outline" size={24} />
            <Text style={styles.brand}>Insightify</Text>
          </View>
          <Text style={styles.muted}>AI-Powered Scam Detection</Text>
        </View>

        {/* TITLE */}
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your email address and we’ll send you a link to reset your password.
        </Text>

        {/* INPUT */}
        <View style={styles.form}>
          <AuthInput
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {/* ✅ BUTTON CONNECTED */}
          <PrimaryButton
            title={loading ? 'Sending...' : 'Send Reset Link'}
            onPress={handleResetPassword}
            disabled={loading}
          />
        </View>

        {/* BACK TO LOGIN */}
        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.link}>← Back to Login</Text>
          </TouchableOpacity>
        </View>

        {/* PRIVACY */}
        <View style={styles.privacy}>
          <Icon name="lock-closed-outline" size={14} color="#9b9b9b" />
          <Text style={styles.privacyText}>
            {' '}Your privacy is protected by end-to-end encryption
          </Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 22 },

  header: { marginBottom: 30 },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  brand: { fontSize: 18, fontWeight: '700', marginLeft: 10 },
  muted: { fontSize: 12, color: '#999', marginTop: 6 },

  title: { fontSize: 26, fontWeight: '800', marginBottom: 8 },
  subtitle: {
    fontSize: 14,
    color: '#7a7a7a',
    marginBottom: 26,
    lineHeight: 20,
  },

  form: { marginBottom: 16 },

  bottomRow: {
    marginTop: 18,
    alignItems: 'center',
  },
  link: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '700',
  },

  privacy: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 26,
  },
  privacyText: {
    fontSize: 12,
    color: '#9b9b9b',
  },
});
