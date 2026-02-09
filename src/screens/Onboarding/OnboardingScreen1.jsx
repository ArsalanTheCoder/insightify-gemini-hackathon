import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Text, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native'; 

import OnboardingFooter from '../../components/Onboarding/OnboardingFooter';
import PrimaryButton from '../../components/auth/PrimaryButton';

const { width } = Dimensions.get('window');

export default function Onboarding1({ navigation }) {
  
  const finishOnboarding = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    navigation.replace('DetectScreen'); 
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        
        {/* --- CUSTOM SLIDE CONTENT --- */}
        <View style={styles.slideContainer}>
          
          <View style={styles.animationBox}>
            {/* 👇 UPDATED PATH: 
               Going up 3 levels (../../../) to reach the root 'assets' folder 
            */}
            <LottieView
              source={require('../../../assets/animations/scam_alert.json')} 
              autoPlay
              loop
              style={styles.lottie}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Scams Are Evolving</Text>
          <Text style={styles.subtitle}>
            Every day, millions lose money to AI voice clones, fake texts, and deepfake videos. Don't be next.
          </Text>
        </View>

        {/* --- FOOTER & BUTTONS --- */}
        <View>
          <View style={styles.cta}>
            <PrimaryButton
              title="Next"
              onPress={() => navigation.navigate('Onboarding2')}
            />
          </View>

          <OnboardingFooter
            index={0}
            total={3} 
            onNext={() => navigation.navigate('Onboarding2')}
            onSkip={finishOnboarding}
          />
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  inner: { flex: 1, justifyContent: 'space-between', padding: 22 },
  
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  animationBox: {
    width: width * 0.8,
    height: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FEF2F2', 
    borderRadius: 200, 
  },
  lottie: {
    width: '90%',
    height: '90%',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 24,
  },
  cta: { paddingHorizontal: 6, marginTop: 6 },
});