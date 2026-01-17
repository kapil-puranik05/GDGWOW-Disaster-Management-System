import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, 
  ActivityIndicator, Vibration, Modal, ScrollView,
  Dimensions, StatusBar, Alert
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import GetLocation from 'react-native-get-location';
import { 
  ShieldAlert, MapPin, ChevronDown, 
  X, Info, MessageSquareText, Zap, Navigation,
  Flame, Waves, Mountain, Stethoscope, Car, AlertTriangle,
  CheckCircle2, ArrowLeft 
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const CALAMITIES_TRANSLATED = {
  en: {
    Flood: "Flood",
    Fire: "Fire",
    Earthquake: "Earthquake",
    Medical: "Medical Emergency",
    Accident: "Road Accident",
    Gas: "Gas Leak"
  },
  hi: {
    Flood: "बाढ़",
    Fire: "आग",
    Earthquake: "भूकंप",
    Medical: "चिकित्सीय आपातकाल",
    Accident: "सड़क दुर्घटना",
    Gas: "गैस रिसाव"
  },
  mr: {
    Flood: "पूर",
    Fire: "आग",
    Earthquake: "भूकंप",
    Medical: "वैद्यकीय आपत्काल",
    Accident: "रस्ता अपघात",
    Gas: "गॅस गळती"
  }
};

const CALAMITIES = [
  { key: "Flood", icon: Waves, color: "#FB923C" },
  { key: "Fire", icon: Flame, color: "#FB923C" },
  { key: "Earthquake", icon: Mountain, color: "#FB923C" },
  { key: "Medical", icon: Stethoscope, color: "#FB923C" },
  { key: "Accident", icon: Car, color: "#FB923C" },
  { key: "Gas", icon: AlertTriangle, color: "#FB923C" }
];

const STRINGS = {
  en: {
    guestMode: "Guest Emergency Access",
    normalMode: "Emergency Response System",
    emergencyRequest: "Emergency Request",
    subtitle: "Directly alert the nearest NGO relief units for immediate response.",
    selectCalamity: "Choose Calamity Type",
    triggerSOS: "TRIGGER SOS",
    verifyLocation: "Verify Location",
    detectingLocation: "Detecting location...",
    readyToPing: "Signal verified. Ready to ping 5 nearest rescue units.",
    returnSelection: "Return to Selection",
    sendAlert: "SEND ALERT NOW",
    alertDispatched: "Alert Dispatched!",
    connecting: "Help is on the way. Connecting you to Rescue Bot.",
    startConversation: "Start Conversation",
    gpsActive: "GPS ACTIVE",
    searching: "SEARCHING..."
  },
  hi: {
    guestMode: "अतिथि आपातकालीन पहुँच",
    normalMode: "आपातकालीन प्रतिक्रिया प्रणाली",
    emergencyRequest: "आपातकालीन अनुरोध",
    subtitle: "निकटतम राहत इकाइयों को तुरंत सूचित करें।",
    selectCalamity: "आपदा प्रकार चुनें",
    triggerSOS: "SOS भेजें",
    verifyLocation: "स्थान सत्यापित करें",
    detectingLocation: "स्थान खोजा जा रहा है...",
    readyToPing: "सिग्नल सत्यापित। 5 राहत इकाइयों को सूचित करने के लिए तैयार।",
    returnSelection: "वापस जाएँ",
    sendAlert: "तुरंत भेजें",
    alertDispatched: "अलर्ट भेज दिया गया!",
    connecting: "मदद रास्ते में है। बॉट से जोड़ रहे हैं।",
    startConversation: "बातचीत शुरू करें",
    gpsActive: "GPS सक्रिय",
    searching: "खोज जारी..."
  },
  mr: {
    guestMode: "अतिथि आपत्काल प्रवेश",
    normalMode: "आपत्काल प्रतिसाद प्रणाली",
    emergencyRequest: "आपत्कालीन विनंती",
    subtitle: "सर्वात जवळील मदत युनिट्सना त्वरित कळवा.",
    selectCalamity: "आपत्ती प्रकार निवडा",
    triggerSOS: "SOS पाठवा",
    verifyLocation: "स्थान तपासा",
    detectingLocation: "स्थान शोधत आहे...",
    readyToPing: "सिग्नल सत्यापित. 5 मदत युनिट्सना कळवण्यासाठी तयार.",
    returnSelection: "मागे जा",
    sendAlert: "तात्काळ पाठवा",
    alertDispatched: "अलर्ट पाठवला!",
    connecting: "मदत येत आहे. बॉटशी जोडत आहोत.",
    startConversation: "संवाद सुरू करा",
    gpsActive: "GPS सक्रिय",
    searching: "शोधत आहे..."
  }
};

export default function SOSScreen({ navigation }) {
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const isGuest = route.name === 'GuestSOS';

  const [language, setLanguage] = useState(null);
  const [step, setStep] = useState('IDLE');
  const [selectedCalamity, setSelectedCalamity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [location, setLocation] = useState({ lat: null, lon: null });
  const [locLoading, setLocLoading] = useState(false);

  const fetchCurrentLocation = async () => {
    setLocLoading(true);
    try {
      const pos = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000
      });
      setLocation({ lat: pos.latitude, lon: pos.longitude });
    } catch (err) {
      Alert.alert("GPS Error", "Enable location services to continue.");
      setStep('IDLE');
    } finally {
      setLocLoading(false);
    }
  };

  useEffect(() => {
    if (step === 'CONFIRMING') fetchCurrentLocation();
  }, [step]);

  const sendEmergencyPayload = async (backendPayload) => {
    const res = await fetch("http://10.0.2.2:8080", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(backendPayload)
    });

    if (!res.ok) throw new Error("Network failure");
    return await res.json();
  };

  const triggerSOSAlert = async () => {
    if (!selectedCalamity) {
      Alert.alert("Missing Calamity", "Please select a calamity type.");
      return;
    }
    if (!location.lat || !location.lon) {
      Alert.alert("GPS Not Ready", "Waiting for GPS lock...");
      return;
    }

    setLoading(true);
    Vibration.vibrate([100, 500, 100]);

    const payloadToBackend = {
      calamity: selectedCalamity,
      latitude: parseFloat(location.lat),
      longitude: parseFloat(location.lon)
    };

    console.log("📤 SENDING EMERGENCY:", payloadToBackend);

    try {
      const result = await sendEmergencyPayload(payloadToBackend);
      const [closestList, emergencyStatus] = result;

      const payloadToBot = {
        ...payloadToBackend,
        ngos: closestList,
        emergencyStatus,
        isEmergency: true,
        isGuest,
        language,
        deviceLocation: location,
        timestamp: Date.now()
      };

      setLoading(false);
      proceedToBot(payloadToBot);

    } catch (err) {
      setLoading(false);
      Alert.alert("Network Error", "Unable to dispatch alert");
    }
  };

  const proceedToBot = (payload) => {
    navigation.navigate("Bot", {
      ...payload,
      isEmergency: true
    });
  };

  if (!language) {
    return (
      <Modal visible transparent animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={[styles.popupContent, { padding: 20 }]}>
            <Text style={styles.popupTitle}>
              Select Language / भाषा चुनें / भाषा निवडा
            </Text>
            <TouchableOpacity style={styles.langBtn} onPress={() => setLanguage('en')}>
              <Text style={styles.langText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.langBtn} onPress={() => setLanguage('hi')}>
              <Text style={styles.langText}>हिंदी</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.langBtn} onPress={() => setLanguage('mr')}>
              <Text style={styles.langText}>मराठी</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>

        {/* Updated Header with Back Button */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View>
              <Text style={styles.brand}>
                Sah<Text style={{ color: '#FB923C' }}>AI</Text>ta
              </Text>
              <Text style={styles.headerSub}>
                {isGuest ? STRINGS[language].guestMode : STRINGS[language].normalMode}
              </Text>
            </View>
          </View>

          <View style={styles.liveTag}>
            <View style={[styles.pulse, locLoading && { backgroundColor: '#FB923C' }]} />
            <Text style={styles.liveText}>
              {locLoading ? STRINGS[language].searching : STRINGS[language].gpsActive}
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.mainScroll} showsVerticalScrollIndicator={false}>
          
          {step === 'IDLE' ? (
            <View style={styles.flowCard}>
              <View style={styles.iconCircle}>
                <ShieldAlert size={38} color="#FB923C" />
              </View>
              <Text style={styles.title}>{STRINGS[language].emergencyRequest}</Text>
              <Text style={styles.subtitle}>{STRINGS[language].subtitle}</Text>

              <TouchableOpacity style={styles.selector} onPress={() => setShowPicker(true)}>
                <View style={styles.selectorLeft}>
                  <Zap size={18} color="#FB923C" />
                  <Text style={styles.selectorText}>
                    {selectedCalamity
                      ? CALAMITIES_TRANSLATED[language][selectedCalamity]
                      : STRINGS[language].selectCalamity}
                  </Text>
                </View>
                <ChevronDown size={20} color="#94A3B8" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.bigButton, !selectedCalamity && styles.disabled]}
                disabled={!selectedCalamity}
                onPress={() => setStep('CONFIRMING')}
              >
                <View style={styles.innerCircle}>
                  <ShieldAlert size={42} color="#fff" />
                </View>
                <Text style={styles.buttonLabel}>{STRINGS[language].triggerSOS}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.flowCard}>
              <View style={styles.locationContainer}>
                <View style={styles.locationIconBg}>
                  {locLoading
                    ? <ActivityIndicator color="#FB923C" />
                    : <MapPin size={36} color="#FB923C" />}
                </View>
              </View>
              <Text style={styles.title}>{STRINGS[language].verifyLocation}</Text>
              <Text style={styles.locationDetail}>
                {locLoading
                  ? STRINGS[language].detectingLocation
                  : `${location.lat?.toFixed(4)}, ${location.lon?.toFixed(4)}`}
              </Text>
              <View style={styles.infoAlert}>
                <Info size={18} color="#FB923C" />
                <Text style={styles.infoText}>
                  {locLoading ? STRINGS[language].searching : STRINGS[language].readyToPing}
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.confirmBtn, (locLoading || !location.lat || !location.lon) && { opacity: 0.6 }]}
                disabled={loading || locLoading || !location.lat || !location.lon}
                onPress={triggerSOSAlert}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <View style={styles.row}>
                    <Navigation size={18} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.confirmBtnText}>{STRINGS[language].sendAlert}</Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStep('IDLE')} style={styles.cancelBtn} disabled={loading}>
                <Text style={styles.cancelText}>{STRINGS[language].returnSelection}</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={{ height: 100 }} />
        </ScrollView>

        {!isGuest && (
          <TouchableOpacity
            style={[styles.fab, { bottom: insets.bottom + 20 }]}
            onPress={() => navigation.navigate("Bot", { calamity: "General", isEmergency: false })}
          >
            <MessageSquareText color="#FB923C" size={28} />
          </TouchableOpacity>
        )}

        {/* Picker Modal */}
        <Modal visible={showPicker} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHandle} />
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalHeader}>{STRINGS[language].selectCalamity}</Text>
                <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.closeBtn}>
                  <X size={20} color="#FB923C"/>
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {CALAMITIES.map(c => (
                  <TouchableOpacity
                    key={c.key}
                    style={[styles.modalItem, selectedCalamity === c.key && styles.activeModalItem]}
                    onPress={() => {
                      setSelectedCalamity(c.key);
                      setShowPicker(false);
                    }}
                  >
                    <View style={styles.modalItemLeft}>
                      <View style={[styles.modalIconBgItem, { backgroundColor: '#FFF7ED' }]}>
                        <c.icon size={20} color="#FB923C" />
                      </View>
                      <Text style={[styles.modalItemText, selectedCalamity === c.key && styles.activeModalItemText]}>
                        {CALAMITIES_TRANSLATED[language][c.key]}
                      </Text>
                    </View>
                    {selectedCalamity === c.key && <View style={styles.activeDot} />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Success Modal */}
        <Modal visible={showSuccess} transparent animationType="fade">
          <View style={styles.popupOverlay}>
            <View style={styles.popupContent}>
              <View style={styles.successIconCircle}>
                <CheckCircle2 size={50} color="#10B981" />
              </View>
              <Text style={styles.popupTitle}>{STRINGS[language].alertDispatched}</Text>
              <Text style={styles.popupSubtitle}>{STRINGS[language].connecting}</Text>
              <TouchableOpacity
                style={styles.popupBtn}
                onPress={() => proceedToBot({
                  calamity: selectedCalamity,
                  location,
                  isGuest,
                  isEmergency: true
                })}
              >
                <Text style={styles.popupBtnText}>{STRINGS[language].startConversation}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  backIconBtn: { marginRight: 15, padding: 8, backgroundColor: '#F1F5F9', borderRadius: 12 },
  brand: { fontSize: 28, fontWeight: '900', color: '#0F172A' },
  headerSub: { fontSize: 11, color: '#94A3B8', fontWeight: '800' },
  liveTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, elevation: 2 },
  pulse: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E', marginRight: 6 },
  liveText: { fontSize: 10, fontWeight: '900', color: '#15803D' },
  mainScroll: { paddingHorizontal: 20, paddingTop: 20 },
  flowCard: { backgroundColor: '#FFFFFF', padding: 30, borderRadius: 45, alignItems: 'center', elevation: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  iconCircle: { width: 75, height: 75, borderRadius: 38, backgroundColor: '#FFF7ED', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#FFEDD5' },
  title: { fontSize: 26, fontWeight: '900', color: '#0F172A' },
  subtitle: { textAlign: 'center', color: '#64748B', marginTop: 12, marginBottom: 35, lineHeight: 22, fontWeight: '500' },
  selector: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', padding: 20, borderRadius: 24, marginBottom: 25, borderWidth: 1.5, borderColor: '#E2E8F0' },
  selectorLeft: { flexDirection: 'row', alignItems: 'center' },
  selectorText: { fontWeight: '800', color: '#0F172A', fontSize: 15, marginLeft: 10 },
  bigButton: { width: '100%', height: 180, backgroundColor: '#FF2D2D', borderRadius: 40, justifyContent: 'center', alignItems: 'center' },
  disabled: { backgroundColor: '#FD8D8D' },
  innerCircle: { width: 85, height: 85, borderRadius: 45, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)' },
  buttonLabel: { color: '#fff', fontWeight: '900', fontSize: 22, marginTop: 15 },
  locationContainer: { marginBottom: 20, alignItems: 'center' },
  locationIconBg: { backgroundColor: '#FFF7ED', padding: 25, borderRadius: 35, borderWidth: 1, borderColor: '#FFEDD5' },
  locationDetail: { fontWeight: '800', color: '#94A3B8', marginTop: 12, fontSize: 16 },
  infoAlert: { flexDirection: 'row', alignItems: 'center', marginTop: 30, padding: 18, backgroundColor: '#FFF7ED', borderRadius: 25, borderWidth: 1, borderColor: '#FFEDD5' },
  infoText: { color: '#9A3412', fontSize: 14, fontWeight: '700', flex: 1, marginLeft: 10 },
  confirmBtn: { width: '100%', backgroundColor: '#0F172A', paddingVertical: 22, borderRadius: 25, marginTop: 35, alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  confirmBtnText: { color: '#fff', fontWeight: '900', fontSize: 18 },
  cancelBtn: { marginTop: 25, padding: 10 },
  cancelText: { color: '#94A3B8', fontWeight: '800' },
  fab: { position: 'absolute', right: 20, width: 68, height: 68, borderRadius: 34, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  popupOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  popupContent: { width: width * 0.85, backgroundColor: '#fff', borderRadius: 40, padding: 30, alignItems: 'center' },
  successIconCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#DCFCE7', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  popupTitle: { fontSize: 22, fontWeight: '900', color: '#0F172A', textAlign: 'center' },
  popupSubtitle: { fontSize: 14, color: '#64748B', textAlign: 'center', marginTop: 10, marginBottom: 30 },
  popupBtn: { backgroundColor: '#FB923C', width: '100%', paddingVertical: 18, borderRadius: 20, alignItems: 'center' },
  popupBtnText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', padding: 30, borderTopLeftRadius: 50, borderTopRightRadius: 50, maxHeight: '80%' },
  modalHandle: { width: 45, height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, alignSelf: 'center', marginBottom: 25 },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  modalHeader: { fontSize: 24, fontWeight: '900', color: '#0F172A' },
  closeBtn: { backgroundColor: '#F1F5F9', padding: 10, borderRadius: 15 },
  modalItem: { paddingVertical: 18, paddingHorizontal: 20, borderRadius: 22, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  modalItemLeft: { flexDirection: 'row', alignItems: 'center' },
  modalIconBgItem: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  modalItemText: { fontSize: 18, fontWeight: '700', color: '#475569', marginLeft: 15 },
  activeModalItem: { backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#E2E8F0' },
  activeModalItemText: { color: '#0F172A' },
  activeDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FB923C' },
  langBtn: { width: '100%', paddingVertical: 16, borderRadius: 16, backgroundColor: '#FFF7ED', borderWidth: 1, borderColor: '#FFEDD5', marginTop: 12, alignItems: 'center' },
  langText: { fontWeight: '900', fontSize: 17, color: '#FB923C' }
});