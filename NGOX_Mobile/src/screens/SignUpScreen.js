import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, ScrollView, Platform, Modal, Dimensions
} from 'react-native';
import { 
  User, Mail, Lock, Phone, ArrowLeft, 
  Eye, EyeOff, CheckCircle2, X 
} from 'lucide-react-native';
import { COLORS } from '../theme/color';

const { width } = Dimensions.get('window');

export default function SignUpScreen({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', password: ''
  });

  const [errors, setErrors] = useState({});
  const [secure, setSecure] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false); // Success Modal State

  const validate = () => {
    const e = {};
    if (!formData.fullName.trim()) e.fullName = 'Full name is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email';
    if (formData.phone.length < 8) e.phone = 'Phone number too short';
    if (formData.password.length < 6) e.password = 'Minimum 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignup = () => {
    if (!validate()) return;
    // Trigger the custom popup
    setShowSuccess(true);
  };

  const navigateToLogin = () => {
    setShowSuccess(false);
    navigation.navigate('Login', { prefilledEmail: formData.email });
  };

  const disabled = !formData.fullName || !formData.email || !formData.phone || !formData.password;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 40}}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#0F172A" />
        </TouchableOpacity>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join SahAIta to stay safe and help others.</Text>

        {renderInput('fullName', 'Full Name' ,User, errors.fullName, formData, setFormData)}
        {renderInput('email', 'Email Address', Mail, errors.email, formData, setFormData, 'email-address')}
        {renderInput('phone', 'Mobile Number', Phone, errors.phone, formData, setFormData, 'phone-pad')}

        <View style={styles.inputGroup}>
          <Lock size={20} color="#94a3b8" />
          <TextInput
            placeholder="Create Password"
            placeholderTextColor="#94a3b8"
            secureTextEntry={secure}
            style={styles.input}
            value={formData.password}
            onChangeText={(txt) => setFormData({ ...formData, password: txt })}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            {secure ? <EyeOff size={20} color="#94a3b8" /> : <Eye size={20} color="#FB923C" />}
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.err}>{errors.password}</Text>}

        <TouchableOpacity
          style={[styles.signupBtn, disabled && { opacity: 0.5 }]}
          onPress={handleSignup}
          disabled={disabled}
        >
          <Text style={styles.signupBtnText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* --- SUCCESS POPUP MODAL --- */}
      <Modal
        visible={showSuccess}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successIconBg}>
              <CheckCircle2 size={50} color="#10B981" />
            </View>
            
            <Text style={styles.modalTitle}>Registration Successful!</Text>
            <Text style={styles.modalSubtitle}>
              Your account for <Text style={{fontWeight: 'bold', color: '#0F172A'}}>{formData.fullName}</Text> has been created.
            </Text>

            <TouchableOpacity style={styles.modalBtn} onPress={navigateToLogin}>
              <Text style={styles.modalBtnText}>Proceed to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function renderInput(key, placeholder, Icon, error, formData, setFormData, keyboardType) {
  return (
    <>
      <View style={styles.inputGroup}>
        <Icon size={20} color="#94a3b8" />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          style={styles.input}
          keyboardType={keyboardType}
          value={formData[key]}
          onChangeText={(txt) => setFormData({ ...formData, [key]: txt })}
        />
      </View>
      {error && <Text style={styles.err}>{error}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 30 },
  backBtn: { marginTop: 60, marginBottom: 10 },
  title: { fontSize: 32, fontWeight: '900', color: '#0F172A', letterSpacing: -1 },
  subtitle: { color: '#64748b', marginBottom: 30, fontSize: 16, fontWeight: '500' },
  inputGroup: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 18, paddingHorizontal: 16, height: 60,
    marginBottom: 12, borderWidth: 1.5, borderColor: '#F1F5F9'
  },
  input: { flex: 1, marginLeft: 12, fontWeight: '600', color: '#0F172A' },
  err: { color: '#EF4444', fontSize: 12, marginBottom: 8, marginLeft: 5, fontWeight: '700' },
  signupBtn: {
    backgroundColor: '#FB923C', height: 64, borderRadius: 22,
    justifyContent: 'center', alignItems: 'center', marginTop: 25,
    elevation: 8, shadowColor: '#FB923C', shadowOpacity: 0.3, shadowRadius: 15
  },
  signupBtnText: { color: '#fff', fontWeight: '900', fontSize: 16, letterSpacing: 1 },

  /* Modal Styles */
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center', alignItems: 'center'
  },
  modalContent: {
    width: width * 0.85, backgroundColor: '#fff',
    borderRadius: 40, padding: 30, alignItems: 'center',
    elevation: 20, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 20
  },
  successIconBg: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#DCFCE7', justifyContent: 'center',
    alignItems: 'center', marginBottom: 20
  },
  modalTitle: { fontSize: 22, fontWeight: '900', color: '#0F172A', textAlign: 'center' },
  modalSubtitle: {
    fontSize: 14, color: '#64748B', textAlign: 'center',
    marginTop: 10, marginBottom: 30, lineHeight: 20
  },
  modalBtn: {
    backgroundColor: '#0F172A', width: '100%',
    paddingVertical: 18, borderRadius: 20, alignItems: 'center'
  },
  modalBtnText: { color: '#fff', fontWeight: '900', fontSize: 16 }
});