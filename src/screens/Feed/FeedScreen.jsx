import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeedCard from './components/FeedCard';

// --- MOCK DATA WITH LOCAL JPEG ASSETS ---
// Path: 3 levels up to root from src/screens/Feed/
const FEED_DATA = [
  {
    id: '1',
    time: '1 hour ago',
    type: 'VoiceCloning',
    title: 'The $200M Voice-Cloning Scams',
    description:
      '⚠️ MAJOR: Voice cloning scams have cost victims an estimated $200M in recent years.\n\n' +
      '• Scammers clone voices to request money from family or execs\n' +
      '• Use short audio snippets from public content\n\n' +
      '🛡️ Tip: Verify urgent requests by calling a separate number.',
    image: require('../../../assets/images/scam1.jpeg'),
    isVerified: true,
  },

  {
    id: '2',
    time: '3 hours ago',
    type: 'Deepfake',
    title: 'Be Aware of ChatGPT Scams',
    description:
      '⚠️ WARNING: Scammers use ChatGPT-style deepfakes to craft believable messages and impersonations.\n\n' +
      '• Fake chat transcripts\n' +
      '• AI-generated social posts that look genuine\n\n' +
      '🔎 Tip: Cross-check on official channels before acting.',
    image: require('../../../assets/images/scam2.jpeg'),
    isVerified: true,
  },

  {
    id: '3',
    time: '5 hours ago',
    type: 'VoiceTheft',
    title: 'AI Can Steal Your Voice in 15 Seconds',
    description:
      '⚠️ ALERT: Modern tools can clone a person’s voice with very short audio samples (≈15s).\n\n' +
      '• Protect audio on public platforms\n' +
      '• Avoid posting private voice notes',
    image: require('../../../assets/images/scam3.jpeg'),
    isVerified: true,
  },

  {
    id: '4',
    time: '7 hours ago',
    type: 'AIHack',
    title: 'AI Hackers Can Steal Your Voice',
    description:
      '⚠️ NOTICE: Attackers are scraping audio from social media to produce realistic impostor calls and messages.\n\n' +
      '• Remove unnecessary voice clips from public profiles\n' +
      '• Enable secondary verification for payments',
    image: require('../../../assets/images/scam4.jpeg'),
    isVerified: true,
  },
  
  {
    id: '5',
    time: '6 hours ago',
    type: 'Deepfake',
    title: 'AI Is Creating Fake Videos of Teens',
    description:
      '⚠️ ALERT: AI generated over 50,000 fake videos targeting teenagers last month.\n\n' +
      '• Fake videos of children\n' +
      '• Deepfake voice messages\n' +
      '• Manipulated images\n\n' +
      '🚨 Reality Check: 78% of teens can’t identify AI-generated content.\n' +
      'This threat has moved far beyond cyberbullying.',
    image: require('../../../assets/images/scam5.jpeg'),
    isVerified: true,
  },

  {
    id: '6',
    time: '10 hours ago',
    type: 'DeepfakeFraud',
    title: 'CEO Sent $5M — It Was a Deepfake',
    description:
      '⚠️ CRITICAL: A CEO approved a $5M transfer believing it was a real request.\n\n' +
      'Threats executives face:\n' +
      '• AI-cloned voices & faces\n' +
      '• Fake employees influencing decisions\n\n' +
      '🛡️ Protect your organization:\n' +
      '• Double-verify executive requests\n' +
      '• Add multi-factor approvals\n' +
      '• Run deepfake simulations',
    image: require('../../../assets/images/scam6.jpeg'),
    isVerified: true,
  },

  {
    id: '7',
    time: '1 day ago',
    type: 'DataBreach',
    title: '$3.2B Data Exposed to AI Hackers',
    description:
      '⚠️ WARNING: AI-driven attacks exposed billions in data last year.\n\n' +
      'Top defenses include:\n' +
      '• Multi-factor authentication\n' +
      '• Zero-trust network access\n' +
      '• End-to-end encryption\n' +
      '• AI threat detection\n' +
      '• Regular security audits\n\n' +
      'Your data is either protected — or exposed.',
    image: require('../../../assets/images/scam7.jpeg'),
    isVerified: true,
  },

  {
    id: '8',
    time: '2 days ago',
    type: 'ExecutiveTargeting',
    title: 'Founders Are Prime Cyber Targets',
    description:
      '⚠️ NOTICE: Founders and executives are high-value targets for hackers.\n\n' +
      'Attack methods include:\n' +
      '• Advanced phishing\n' +
      '• Social engineering\n' +
      '• Credential theft\n\n' +
      '🔐 Stay protected:\n' +
      '• Enable 2FA everywhere\n' +
      '• Verify unusual requests\n' +
      '• Never share credentials',
    image: require('../../../assets/images/scam8.jpeg'),
    isVerified: true,
  },

  {
    id: '9',
    time: '3 days ago',
    type: 'CryptoScam',
    title: 'Fake Elon Musk Crypto Videos',
    description:
      '⚠️ SCAM ALERT: Deepfake videos impersonating Elon Musk are promoting fake crypto giveaways.\n\n' +
      'How the scam works:\n' +
      '• Claims you send 1 Bitcoin, get 2 back\n' +
      '• Uses Tesla or SpaceX branding\n' +
      '• Creates fake urgency\n\n' +
      '🚫 Real leaders never ask for crypto payments.',
    image: require('../../../assets/images/scam9.jpeg'),
    isVerified: true,
  },

  {
    id: '10',
    time: '4 days ago',
    type: 'AIImpersonation',
    title: 'The Most Dangerous AI Crime Today',
    description:
      '⚠️ ALERT: People are being impersonated using cloned faces and voices.\n\n' +
      'Real incidents include:\n' +
      '• Fake emergency calls to parents\n' +
      '• CEO fraud video calls\n' +
      '• Reputation-destroying fake videos\n\n' +
      'This is not the future — it’s happening now.',
    image: require('../../../assets/images/scam10.jpeg'),
    isVerified: true,
  },

  {
    id: '11',
    time: '5 days ago',
    type: 'AIPrivacyRisk',
    title: 'Oversharing with AI Is Risky',
    description:
      '⚠️ PRIVACY WARNING: Chatbots are not private vaults.\n\n' +
      'Risky data includes:\n' +
      '• Personal conversations\n' +
      '• Financial projections\n' +
      '• Client or business secrets\n\n' +
      '🔒 Protect yourself:\n' +
      '• Avoid sensitive inputs\n' +
      '• Review privacy settings\n' +
      '• Use enterprise-grade AI tools',
    image: require('../../../assets/images/scam11.jpeg'),
    isVerified: true,
  },
];

export default function FeedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.topBar}>
        <View>
          <Text style={styles.logo}>Insightify</Text>
          <Text style={styles.sub}>Community Alerts</Text>
        </View>

        <View style={styles.topIcons}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => { /* open search */ }}>
            <Ionicons name="search-outline" size={20} color="#374151" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn} onPress={() => { /* open notifications */ }}>
            <Ionicons name="notifications-outline" size={20} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={FEED_DATA}
        renderItem={({ item }) => <FeedCard post={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  topBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0056D2',
  },
  sub: {
    fontSize: 12,
    color: '#6B7280',
  },
  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginLeft: 12,
    padding: 6,
    borderRadius: 8,
  },
});
