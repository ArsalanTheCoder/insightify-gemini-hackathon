import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SplashScreen({ navigation }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

      <Animated.View
        style={[
          styles.center,
          { opacity, transform: [{ scale }] },
        ]}
      >
        <View style={styles.iconWrap}>
          <Icon name="shield-checkmark-outline" size={42} color="#2563EB" />
        </View>

        <Text style={styles.logo}>Insightify</Text>
        <Text style={styles.tagline}>AI-Powered Scam Detection</Text>
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Protecting you intelligently</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  center: {
    alignItems: 'center',
  },

  iconWrap: {
    width: 84,
    height: 84,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },

  logo: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  tagline: {
    marginTop: 8,
    fontSize: 14,
    color: '#DBEAFE',
  },

  footer: {
    position: 'absolute',
    bottom: 30,
  },

  footerText: {
    fontSize: 12,
    color: '#BFDBFE',
  },
});
