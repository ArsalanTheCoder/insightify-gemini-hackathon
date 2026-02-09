import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';

export default function OmniInput({ onSend, isLoading }) {
  const [text, setText] = useState('');

  const handlePress = () => {
    if (text.trim().length > 0) {
      onSend(text);
      setText('');
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* Left Side: Media Actions */}
        <TouchableOpacity style={styles.mediaBtn} onPress={() => alert('Image Upload Coming Soon')}>
          <Text style={styles.icon}>📷</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.mediaBtn} onPress={() => alert('Audio Recording Coming Soon')}>
          <Text style={styles.icon}>🎙️</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider} />
        
        {/* Center: Text Input */}
        <TextInput
          style={styles.input}
          placeholder="Check text, link, or message..."
          value={text}
          onChangeText={setText}
          multiline
          placeholderTextColor="#999"
        />

        {/* Right Side: Send Button */}
        <TouchableOpacity 
          style={[styles.sendBtn, text.length === 0 && styles.disabledBtn]} 
          onPress={handlePress}
          disabled={text.length === 0 || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.sendIcon}>⬆</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    paddingTop: 5,
    backgroundColor: '#fff', 
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 30, // Capsule shape
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 2,
  },
  mediaBtn: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: '#555',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#D0D0D0',
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    maxHeight: 100, // Auto-grow limit
    paddingVertical: 4, // Center text vertically
  },
  sendBtn: {
    backgroundColor: '#0056D2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  disabledBtn: {
    backgroundColor: '#E0E0E0',
  },
  sendIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -2, // Visual adjustment
  },
});