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
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import AuthInput from '../../components/auth/AuthInput';
import PrimaryButton from '../../components/auth/PrimaryButton';
import SocialAuthRow from '../../components/auth/SocialAuthRow';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import { loginWithEmail } from '../../services/authService';


export default function LoginScreen({ navigation }) {
const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter email and password');
      return;
    }

    try {
      setLoading(true);

      const userCredential = await loginWithEmail(
        email.trim(),
        password
      );

      await login(userCredential.user);

    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <Icon name="shield-outline" size={24} />
            <Text style={styles.brand}>Insightify</Text>
          </View>
          <Text style={styles.muted}>AI-Powered Scam Detection</Text>
        </View>

        {/* HERO */}
        <Text style={styles.hero}>Empowering You to Outsmart AI Fraud</Text>
        <Text style={styles.heroSub}>Stay Away, Stay Safe</Text>

        {/* TITLE */}
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Login to continue protecting yourself
        </Text>

        {/* FORM */}
        <View style={styles.form}>
          <AuthInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <AuthInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.forgotWrap}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>

          <PrimaryButton
            title={loading ? 'Logging in...' : 'Login Securely'}
            onPress={handleLogin}
            disabled={loading}
          />

          {loading && (
            <ActivityIndicator
              style={{ marginTop: 12 }}
              size="small"
              color="#1976d2"
            />
          )}
        </View>

        {/* SIGN UP */}
        <View style={styles.bottomRow}>
          <Text style={styles.small}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}> Sign Up</Text>
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
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 22,
  },

  header: {
    marginBottom: 24,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brand: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },
  muted: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },

  hero: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  heroSub: {
    fontSize: 13,
    color: '#7a7a7a',
    marginBottom: 26,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#7a7a7a',
    marginBottom: 24,
  },

  form: {
    marginBottom: 16,
  },

  forgotWrap: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  forgot: {
    fontSize: 13,
    color: '#1976d2',
    fontWeight: '600',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
  },
  small: {
    fontSize: 13,
    color: '#666',
  },
  link: {
    fontSize: 13,
    color: '#1976d2',
    fontWeight: '700',
  },

  privacy: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  privacyText: {
    fontSize: 12,
    color: '#9b9b9b',
  },
});
