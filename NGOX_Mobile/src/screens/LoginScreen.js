import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, ScrollView, Platform, StatusBar,
  ActivityIndicator, Modal, Dimensions
} from 'react-native';
import { 
  Mail, Lock, Eye, EyeOff, LogIn, 
  ShieldAlert, ChevronRight, AlertTriangle, X 
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation, route, onLogin }) {
  const prefilledEmail = route.params?.prefilledEmail || '';

  const [email, setEmail] = useState(prefilledEmail);
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Custom Modal State
  const [showGuestModal, setShowGuestModal] = useState(false);

  useEffect(() => {
    if (prefilledEmail) setEmail(prefilledEmail);
  }, [prefilledEmail]);

  const handleLogin = () => {
    if (!email || !password) return;
    setLoading(true);
    
    // Simulate API Login
    setTimeout(() => {
      setLoading(false);
      if (onLogin) {
        onLogin({
          name: "John Doe",
          email: email,
          phone: "+91 90000 11111"
        });
      }
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.bgBlob} />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.headerSection}>
            <Text style={styles.brand}>Sah<Text style={{color: '#FB923C'}}>AI</Text><Text>ta</Text></Text>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Securely log in to your emergency dashboard.</Text>
          </View>

          {/* Login Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Mail size={20} color="#94a3b8" />
              <TextInput 
                placeholder="Email Address" 
                placeholderTextColor="#94a3b8" 
                style={styles.input} 
                value={email} 
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Lock size={20} color="#94a3b8" />
              <TextInput 
                placeholder="Password" 
                placeholderTextColor="#94a3b8" 
                secureTextEntry={secure} 
                style={styles.input} 
                value={password} 
                onChangeText={setPassword} 
              />
              <TouchableOpacity onPress={() => setSecure(!secure)}>
                {secure ? <EyeOff size={20} color="#94a3b8" /> : <Eye size={20} color="#FB923C" />}
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotPass}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.loginBtn, (!email || !password) && styles.disabledBtn]} 
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View style={styles.btnRow}>
                  <Text style={styles.loginBtnText}>SIGN IN</Text>
                  <LogIn size={20} color="#fff" style={{marginLeft: 10}} />
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Guest SOS Trigger Section */}
          <View style={styles.guestContainer}>
            <View style={styles.dividerRow}>
                <View style={styles.line} />
                <Text style={styles.dividerText}>OR NEED HELP NOW?</Text>
                <View style={styles.line} />
            </View>

            <TouchableOpacity 
              style={styles.guestSosBtn} 
              onPress={() => setShowGuestModal(true)}
              activeOpacity={0.8}
            >
              <View style={styles.guestSosContent}>
                <View style={styles.sosIconCircle}>
                  <ShieldAlert size={24} color="#fff" />
                </View>
                <View style={styles.guestTextContainer}>
                    <Text style={styles.guestSosTitle}>Guest SOS Trigger</Text>
                    <Text style={styles.guestSosSub}>Request emergency help without an account</Text>
                </View>
                <ChevronRight size={20} color="#FB923C" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpLink}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* --- CUSTOM GUEST EMERGENCY POPUP --- */}
      <Modal visible={showGuestModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity 
              style={styles.closeModal} 
              onPress={() => setShowGuestModal(false)}
            >
              <X size={24} color="#CBD5E1" />
            </TouchableOpacity>

            {/* Icon Container */}
            <View style={styles.alertIconContainer}>
              <AlertTriangle size={40} color="#FB923C" strokeWidth={2.5} />
            </View>

            <Text style={styles.modalTitle}>Guest Emergency</Text>
            <Text style={styles.modalSub}>
              You are about to request immediate assistance. Note that Guest Mode only provides access to emergency tools.
            </Text>

            {/* Disclaimer Box */}
            <View style={styles.warningBox}>
                <Text style={styles.warningText}>• Rescue units will receive your live GPS.</Text>
                <Text style={styles.warningText}>• Limited AI Chatbot instructions provided.</Text>
            </View>

            {/* Primary Action Button */}
            <TouchableOpacity 
              style={styles.proceedBtn} 
              onPress={() => {
                setShowGuestModal(false);
                navigation.navigate('GuestSOS');
              }}
            >
              <Text style={styles.proceedBtnText}>PROCEED TO SOS</Text>
              <ShieldAlert size={18} color="#fff" style={{marginLeft: 10}} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelLink} 
              onPress={() => setShowGuestModal(false)}
            >
              <Text style={styles.cancelLinkText}>Go Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  bgBlob: { position: 'absolute', top: -100, left: -100, width: 300, height: 300, borderRadius: 150, backgroundColor: '#FFF7ED', opacity: 0.8 },
  scrollContent: { paddingHorizontal: 30, paddingTop: 80, paddingBottom: 40 },
  headerSection: { marginBottom: 35 },
  brand: { fontSize: 36, fontWeight: '900', color: '#0F172A', letterSpacing: -2, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: '800', color: '#0F172A' },
  subtitle: { color: '#64748b', fontSize: 15, marginTop: 5, lineHeight: 22 },
  
  form: { marginTop: 10 },
  inputGroup: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 18, height: 62, marginBottom: 15, borderWidth: 1.5, borderColor: '#F1F5F9', elevation: 2, shadowColor: '#000', shadowOpacity: 0.02 },
  input: { flex: 1, marginLeft: 12, fontWeight: '600', color: '#0F172A' },
  forgotPass: { alignSelf: 'flex-end', marginBottom: 25, padding: 5 },
  forgotText: { color: '#FB923C', fontWeight: '800', fontSize: 14 },
  loginBtn: { backgroundColor: '#FB923C', height: 64, borderRadius: 22, justifyContent: 'center', alignItems: 'center', elevation: 8, shadowColor: '#FB923C', shadowOpacity: 0.3, shadowRadius: 15 },
  disabledBtn: { backgroundColor: '#FED7AA', elevation: 0 },
  btnRow: { flexDirection: 'row', alignItems: 'center' },
  loginBtnText: { color: '#fff', fontWeight: '900', fontSize: 16, letterSpacing: 1 },

  guestContainer: { marginTop: 40 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  line: { flex: 1, height: 1, backgroundColor: '#F1F5F9' },
  dividerText: { marginHorizontal: 15, fontSize: 10, fontWeight: '800', color: '#CBD5E1', letterSpacing: 1 },
  guestSosBtn: { backgroundColor: '#fff', borderRadius: 24, padding: 18, borderWidth: 2, borderColor: '#FB923C', borderStyle: 'dashed' },
  guestSosContent: { flexDirection: 'row', alignItems: 'center' },
  sosIconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FB923C', justifyContent: 'center', alignItems: 'center' },
  guestTextContainer: { flex: 1, marginLeft: 15 },
  guestSosTitle: { fontSize: 16, fontWeight: '900', color: '#0F172A' },
  guestSosSub: { fontSize: 11, color: '#64748B', fontWeight: '600', marginTop: 2 },

  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 35 },
  footerText: { color: '#64748b', fontWeight: '600' },
  signUpLink: { color: '#FB923C', fontWeight: '800' },

  /* --- CUSTOM MODAL STYLES --- */
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { 
    width: width * 0.88, 
    backgroundColor: '#fff', 
    borderRadius: 40, 
    padding: 30, 
    alignItems: 'center', 
    elevation: 25, 
    shadowColor: '#000', 
    shadowOpacity: 0.2, 
    shadowRadius: 20 
  },
  closeModal: { position: 'absolute', top: 25, right: 25, zIndex: 10 },
  alertIconContainer: { width: 80, height: 80, borderRadius: 28, backgroundColor: '#FFF7ED', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 24, fontWeight: '900', color: '#0F172A' },
  modalSub: { fontSize: 14, color: '#64748B', textAlign: 'center', marginTop: 12, lineHeight: 22, fontWeight: '500' },
  warningBox: { width: '100%', backgroundColor: '#F8FAFC', padding: 15, borderRadius: 20, marginVertical: 25, borderWidth: 1, borderColor: '#F1F5F9' },
  warningText: { fontSize: 12, fontWeight: '700', color: '#475569', marginBottom: 5 },
  proceedBtn: { width: '100%', backgroundColor: '#FB923C', paddingVertical: 20, borderRadius: 22, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 12, shadowColor: '#FB923C', shadowOpacity: 0.35, shadowRadius: 15 },
  proceedBtnText: { color: '#fff', fontWeight: '900', fontSize: 16, letterSpacing: 1 },
  cancelLink: { marginTop: 20, padding: 10 },
  cancelLinkText: { color: '#94A3B8', fontWeight: '800', fontSize: 14 }
});