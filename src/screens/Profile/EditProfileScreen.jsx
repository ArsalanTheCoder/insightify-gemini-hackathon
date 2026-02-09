import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AVATARS } from '../../utils/avatars';

export default function EditProfileScreen({ navigation }) {

  const [profile, setProfile] = useState({
    name: 'Muhammad Maaz',
    username: 'maaz_dev',
    bio: 'Fighting scams & making the internet safer 🚀',
    avatar: AVATARS.image1, // ✅ Maaz image
  });

  const getAvatarSource = (avatar) => {
    if (typeof avatar === 'number') {
      return avatar;
    }
    return { uri: avatar };
  };

  const onSave = () => {
    alert('Profile updated');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Icon name="arrow-back" size={22} color="#2563EB" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Profile</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* AVATAR */}
          <View style={styles.avatarSection}>
            <Image
              source={getAvatarSource(profile.avatar)}
              style={styles.avatar}
            />

            <TouchableOpacity style={styles.changeAvatarBtn}>
              <Icon name="camera-outline" size={18} color="#2563EB" />
              <Text style={styles.changeAvatarText}>Change Photo</Text>
            </TouchableOpacity>
          </View>

          {/* FORM */}
          <View style={styles.card}>
            <Input label="Full Name" value={profile.name} />
            <Input label="Username" value={profile.username} />
            <Input label="Bio" value={profile.bio} multiline style={{ height: 90 }} />
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ---------------- REUSABLE INPUT ---------------- */

function Input({ label, style, ...props }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        {...props}
        style={[styles.input, style]}
        placeholderTextColor="#94A3B8"
      />
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFF',
    paddingHorizontal: 16,
  },

  header: {
    marginTop: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
  },

  avatarSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#EEF4FF',
  },
  changeAvatarBtn: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF4FF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  changeAvatarText: {
    marginLeft: 8,
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 13,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    shadowColor: '#2563EB',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  saveBtn: {
    marginTop: 20,
    backgroundColor: '#2563EB',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
  },
});
