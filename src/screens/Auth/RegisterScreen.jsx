import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import AuthInput from '../../components/auth/AuthInput';
import PrimaryButton from '../../components/auth/PrimaryButton';
import SocialAuthRow from '../../components/auth/SocialAuthRow';
import { registerWithEmail } from '../../services/authService';

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [twoStep, setTwoStep] = useState(true);
  const [loading, setLoading] = useState(false);

  // ✅ REGISTER HANDLER (THIS WAS MISSING)
  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirm) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password !== confirm) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await registerWithEmail(email.trim(), password);
      Alert.alert('Success', 'Account created successfully');
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
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
        <Text style={styles.title}>Create Your Secure Account</Text>
        <Text style={styles.subtitle}>
          Join Insightify and stay ahead of AI scams
        </Text>

        {/* INPUTS */}
        <View style={styles.form}>
          <AuthInput
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <AuthInput
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <AuthInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <AuthInput
            placeholder="Confirm Password"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
          />

          {/* 2 STEP */}
          <View style={styles.switchRow}>
            <Switch
              value={twoStep}
              onValueChange={setTwoStep}
              trackColor={{ false: '#ccc', true: '#7fb3ff' }}
            />
            <Text style={styles.switchText}>
              Enable 2 Step Verification?
              <Text style={styles.recommended}> (Recommended)</Text>
            </Text>
          </View>

          {/* ✅ BUTTON CONNECTED */}
          <PrimaryButton
            title={loading ? 'Creating Account...' : 'Sign Up Securely'}
            onPress={handleRegister}
            disabled={loading}
          />
        </View>

        {/* SIGN IN */}
        <View style={styles.bottomRow}>
          <Text style={styles.small}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}> Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* SOCIAL */}
        <SocialAuthRow />

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

  title: { fontSize: 24, fontWeight: '800', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#7a7a7a', marginBottom: 24 },

  form: { marginBottom: 16 },

  switchRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  switchText: { marginLeft: 10, fontSize: 13, color: '#666', flex: 1 },
  recommended: { color: '#1976d2', fontWeight: '700' },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
  },
  small: { fontSize: 13, color: '#666' },
  link: { fontSize: 13, color: '#1976d2', fontWeight: '700' },

  privacy: { flexDirection: 'row', alignItems: 'center', marginTop: 18 },
  privacyText: { fontSize: 12, color: '#9b9b9b' },
});
