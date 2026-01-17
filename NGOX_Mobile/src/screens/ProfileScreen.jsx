import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, 
  ScrollView, Dimensions, StatusBar, Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  LogOut, User, Mail, Phone, 
  Camera, ShieldCheck, ChevronRight 
} from 'lucide-react-native';
import { COLORS } from '../theme/color';

export default function ProfileScreen({ onLogout, user }) {
  const [profilePic, setProfilePic] = useState(null);

  const handleChangePicture = () => {
    Alert.alert(
      "Update Photo",
      "Upload a profile picture for your NGOX ID.",
      [
        { text: "Camera", onPress: () => console.log("Camera selected") },
        { text: "Gallery", onPress: () => console.log("Gallery selected") },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.bgBlob} />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section with User Data */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={handleChangePicture} 
              activeOpacity={0.9}
              style={styles.avatarWrapper}
            >
              <View style={styles.avatarInner}>
                {profilePic ? (
                    <Text>Image</Text> 
                ) : (
                    <User size={45} color="#FB923C" strokeWidth={2.5} />
                )}
              </View>
              <View style={styles.editBadge}>
                <Camera size={14} color="#fff" />
              </View>
            </TouchableOpacity>
            
            <Text style={styles.userName}>{user?.name || "Member Name"}</Text>
            <View style={styles.statusRow}>
              <ShieldCheck size={12} color="#10B981" />
              <Text style={styles.userStatus}>NGOX Verified</Text>
            </View>
          </View>

          {/* Account Details from Signup */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Information</Text>
            <View style={styles.card}>
              <View style={styles.infoRow}>
                <View style={[styles.iconBox, { backgroundColor: '#FFF7ED' }]}>
                  <Mail size={20} color="#FB923C" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.label}>Email Address</Text>
                  <Text style={styles.value}>{user?.email || "laukikwaikar@gmail.com"}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <View style={[styles.iconBox, { backgroundColor: '#FFF7ED' }]}>
                  <Phone size={20} color="#FB923C" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.label}>Phone Number</Text>
                  <Text style={styles.value}>{user?.phone || "8605884639"}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <TouchableOpacity style={styles.settingsItem}>
                <Text style={styles.settingsText}>Privacy & Security</Text>
                <ChevronRight size={18} color="#CBD5E1" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.logoutBtn} 
            onPress={onLogout}
            activeOpacity={0.8}
          >
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  bgBlob: { position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: 150, backgroundColor: '#FFF7ED', opacity: 0.6 },
  scrollContent: { paddingHorizontal: 25, paddingTop: 20, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 35 },
  avatarWrapper: { marginBottom: 15 },
  avatarInner: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 12, shadowColor: '#FB923C', shadowOpacity: 0.2, shadowRadius: 15, borderWidth: 1, borderColor: '#FFF7ED' },
  editBadge: { position: 'absolute', bottom: 2, right: 2, backgroundColor: '#FB923C', padding: 8, borderRadius: 15, borderWidth: 3, borderColor: '#FAFAFA' },
  userName: { fontSize: 24, fontWeight: '900', color: '#0F172A' },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  userStatus: { fontSize: 12, color: '#10B981', fontWeight: '800', textTransform: 'uppercase' },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 14, fontWeight: '900', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 15, letterSpacing: 1 },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 20, elevation: 5, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 10, borderWidth: 1, borderColor: '#F1F5F9' },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  iconBox: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  infoTextContainer: { flex: 1 },
  label: { fontSize: 10, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase' },
  value: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 18 },
  settingsItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  settingsText: { fontSize: 15, fontWeight: '700', color: '#475569' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 20, borderRadius: 22, backgroundColor: '#FFF1F2', borderWidth: 1, borderColor: '#FFE4E6' },
  logoutText: { color: '#EF4444', fontWeight: '900', fontSize: 16 }
});