import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* ---------------- MOCK QUESTIONS ---------------- */

const QUESTIONS = [
  {
    id: 'q1',
    question: 'You receive an email saying your bank account is locked. What should you do?',
    options: [
      'Click the link and login',
      'Ignore the email',
      'Verify from official bank app',
      'Reply asking for details',
    ],
    correctIndex: 2,
  },
  {
    id: 'q2',
    question: 'Which one is a common phishing sign?',
    options: [
      'Personalized greeting',
      'Urgent language',
      'Official domain email',
      'HTTPS website',
    ],
    correctIndex: 1,
  },
];

/* ---------------- SCREEN ---------------- */

export default function QuizPlayScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = (currentIndex + 1) / QUESTIONS.length;

  const handleNext = () => {
    if (selectedOption === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }

    if (currentIndex === QUESTIONS.length - 1) {
      navigation.replace('QuizResult', {
        total: QUESTIONS.length,
        correct: score + (selectedOption === currentQuestion.correctIndex ? 1 : 0),
      });
    } else {
      setSelectedOption(null);
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔝 TOP BAR */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#2563EB" />
        </TouchableOpacity>

        <Text style={styles.counter}>
          {currentIndex + 1} / {QUESTIONS.length}
        </Text>
      </View>

      {/* 📊 PROGRESS */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      {/* ❓ QUESTION */}
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>
          {currentQuestion.question}
        </Text>
      </View>

      {/* 🧩 OPTIONS */}
      <View>
        {currentQuestion.options.map((opt, index) => {
          const isSelected = selectedOption === index;

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.85}
              onPress={() => setSelectedOption(index)}
              style={[
                styles.optionCard,
                isSelected && styles.optionSelected,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ➡️ NEXT */}
      <TouchableOpacity
        style={[
          styles.nextBtn,
          selectedOption === null && { opacity: 0.5 },
        ]}
        disabled={selectedOption === null}
        onPress={handleNext}
      >
        <Text style={styles.nextText}>
          {currentIndex === QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFF',
    padding: 16,
  },

  /* TOP BAR */
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  counter: {
    fontWeight: '800',
    color: '#2563EB',
  },

  /* PROGRESS */
  progressBar: {
    height: 6,
    backgroundColor: '#E5EDFF',
    borderRadius: 6,
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 6,
  },

  /* QUESTION */
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#2563EB',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 26,
  },

  /* OPTIONS */
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5EDFF',
  },
  optionSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  optionText: {
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '600',
  },
  optionTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  /* NEXT */
  nextBtn: {
    marginTop: 'auto',
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  nextText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
});
