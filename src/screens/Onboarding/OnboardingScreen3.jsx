import React, { useContext } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Text, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

import OnboardingFooter from '../../components/Onboarding/OnboardingFooter';
import PrimaryButton from '../../components/auth/PrimaryButton';
import { OnboardingContext } from '../../context/OnboardingContext';

const { width } = Dimensions.get('window');

export default function Onboarding3() {
  const { completeOnboarding } = useContext(OnboardingContext);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        
        {/* --- CUSTOM SLIDE CONTENT --- */}
        <View style={styles.slideContainer}>
          
          <View style={styles.animationBox}>
             {/* Lottie File: success_shield.json 
                Theme: Green/Safe representing Protection 
             */}
            <LottieView
              source={require('../../../assets/animations/success_shield.json')} 
              autoPlay
              loop={false} // Play once and stop for a "Done" feeling
              style={styles.lottie}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Stay Protected 24/7</Text>
          <Text style={styles.subtitle}>
             Allow notifications so Insightify can alert you the moment a scam arrives. Your privacy is our priority.
          </Text>
        </View>

        {/* --- FOOTER & BUTTONS --- */}
        <View>
          <View style={styles.cta}>
            <PrimaryButton
              title="Activate Protection" // Stronger Call to Action
              onPress={completeOnboarding}
            />
          </View>

          <OnboardingFooter
            index={2}
            total={3}
            onNext={completeOnboarding}
            onSkip={completeOnboarding}
            showGetStarted
            primaryLabel="Activate Protection"
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
    backgroundColor: '#ECFDF5', // Light Green Background
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