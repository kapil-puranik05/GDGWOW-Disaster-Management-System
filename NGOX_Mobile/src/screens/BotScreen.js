import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  Alert, Linking, TextInput, KeyboardAvoidingView, 
  Platform, ActivityIndicator, Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Phone, ShieldAlert, Activity, Map as MapIcon, Send, ArrowLeft, Info } from 'lucide-react-native';
import { COLORS } from '../theme/color';

const { width } = Dimensions.get('window');

const PRECAUTIONS = {
  "Fire": ["Stay low to avoid smoke.", "Check doors for heat before opening.", "Never use elevators."],
  "Flood": ["Move to highest ground immediately.", "Avoid walking/driving in water.", "Turn off main power supplies."],
  "Medical Emergency": ["Check for breathing.", "Apply pressure to wounds.", "Keep victim still and warm."],
  "Default": ["Stay calm and alert.", "Conserve phone battery.", "Follow responder instructions."]
};

export default function BotScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const scrollViewRef = useRef();
  
  const { calamity, isEmergency } = route.params || { calamity: 'General', isEmergency: false };
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isEmergency) {
      handleEmergencyAction();
    } else {
      setMessages([{ id: '1', type: 'bot', text: "Hello! I am your Rescue Assistant. How can I help you today?" }]);
    }
  }, [isEmergency]);

  const handleEmergencyAction = async () => {
    setMessages([{ id: '1', type: 'bot', text: `🚨 SOS Received for ${calamity}. Alerting NGOs and calculating rescue route...` }]);
    try {
      await fetch('http://localhost:8080/ngo/closest-ngos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude: 18.52, longitude: 73.85, n: 1 })
      });
    } catch (e) {
      console.log("Network status handled.");
    }
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: userInput.trim() }]);
    setUserInput('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: (Date.now()+1).toString(), type: 'bot', text: "Take this immediate Precautions:\n1)Stand in open area\nCover your head if in house\nTake shelter under bed to cover from falling objects" }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Orange Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <ArrowLeft color="#FB923C" size={22}/>
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Rescue Bot</Text>
            <Text style={styles.statusText}>Active Connection</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.callBtn} onPress={() => Linking.openURL('tel:100')}>
          <Phone size={18} color="#fff"/>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()} contentContainerStyle={styles.chatArea}>
          {messages.map(msg => (
            <View key={msg.id} style={[styles.bubble, msg.type === 'user' ? styles.userBubble : styles.botBubble]}>
              <Text style={[styles.msgText, msg.type === 'user' ? styles.userText : styles.botText]}>{msg.text}</Text>
            </View>
          ))}

          {isEmergency && (
            <View style={styles.precautionSection}>
              <Text style={styles.precautionHeader}>IMMEDIATE ACTIONS</Text>
              {(PRECAUTIONS[calamity] || PRECAUTIONS["Default"]).map((step, i) => (
                <View key={i} style={styles.precautionCard}>
                  <View style={styles.stepNumContainer}><Text style={styles.stepNum}>{i+1}</Text></View>
                  <Text style={styles.stepDesc}>{step}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        <View style={styles.inputWrapper}>
          <View style={styles.inputBar}>
            <TextInput style={styles.input} placeholder="Type here..." value={userInput} onChangeText={setUserInput}  placeholderTextColor={COLORS.primary} />
            <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
              <Send size={18} color="#fff"/>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBtn: { backgroundColor: '#FFF7ED', padding: 8, borderRadius: 12 },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0F172A' },
  statusText: { fontSize: 10, fontWeight: '700', color: '#22C55E' },
  callBtn: { backgroundColor: '#EF4444', padding: 12, borderRadius: 14 },
  chatArea: { padding: 20 },
  bubble: { padding: 16, borderRadius: 24, maxWidth: width * 0.8, marginBottom: 12 },
  botBubble: { backgroundColor: '#F1F5F9', alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  userBubble: { backgroundColor: '#FB923C', alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  msgText: { fontSize: 14, fontWeight: '600' },
  userText: { color: '#fff' },
  botText: { color: '#334155' },
  precautionSection: { marginTop: 10 },
  precautionHeader: { fontWeight: '900', color: '#FB923C', fontSize: 11, marginBottom: 15 },
  precautionCard: { flexDirection: 'row', gap: 15, backgroundColor: '#fff', padding: 18, borderRadius: 22, borderWidth: 1, borderColor: '#F1F5F9', marginBottom: 10 },
  stepNumContainer: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center' },
  stepNum: { color: '#fff', fontWeight: '900', fontSize: 11 },
  stepDesc: { flex: 1, fontWeight: '800', color: '#475569', fontSize: 13 },
  inputWrapper: { padding: 15, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  inputBar: { flexDirection: 'row', gap: 10 },
  input: { flex: 1, backgroundColor: '#F8FAFC', borderRadius: 20, paddingHorizontal: 18, height: 50, fontWeight: '600' },
  sendBtn: { backgroundColor: '#FB923C', width: 50, height: 50, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }
});