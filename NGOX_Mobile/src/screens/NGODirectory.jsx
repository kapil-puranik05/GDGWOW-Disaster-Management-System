import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, 
  TouchableOpacity, Linking, ActivityIndicator, Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, MapPin, Building2, RefreshCw, Navigation, Search, ShieldAlert } from 'lucide-react-native';
import GetLocation from 'react-native-get-location';

export default function NGODirectory() {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchLocationAndNGOs = async () => {
    setLoading(true);
    setHasSearched(true);

    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });

      const payload = {
        latitude: location.latitude,
        longitude: location.longitude,
        n: 5,
        calamity: "General"
      };

      const response = await fetch("http://10.0.2.2:8080", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      // Read raw body safely
      const text = await response.text();
      console.log("[BACKEND RAW]", text);

      let raw;
      try {
        raw = JSON.parse(text);
      } catch (e) {
        console.error("Invalid proxy JSON:", text);

      }

      // raw = [closestList, emergencyResp]
      const closest = Array.isArray(raw[0]) ? raw[0] : [];

      // Sort if distance exists
      closest.sort((a, b) => (a.distance || 0) - (b.distance || 0));

      setNgos(closest);

    } catch (err) {
      console.log("[NGO ERROR]", err.message);
      Alert.alert(
        "Connection Error",
        "Could not reach rescue server. Ensure GPS + backend are active."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.ngoCard}>
      <View style={styles.cardInfo}>
        <View style={styles.iconBg}>
          <Building2 size={24} color="#FB923C" />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.ngoName}>{item.name}</Text>
            <View style={styles.distanceBadge}>
              <Navigation size={10} color="#FB923C" />
              <Text style={styles.distanceText}>
                {item.distance ? `${item.distance.toFixed(1)} km` : "--"}
              </Text>
            </View>
          </View>

          <Text style={styles.ngoEmail}>{item.email}</Text>
          <View style={styles.locRow}>
            <MapPin size={12} color="#94a3b8" />
            <Text style={styles.address}>
              {item.latitude && item.longitude 
                ? `${item.latitude.toFixed(4)}, ${item.longitude.toFixed(4)}`
                : "--"}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.callButton}
        onPress={() => Linking.openURL(`tel:+91${item.contactNumber}`)}
      >
        <Phone size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>Sah<Text style={{color:'#FB923C'}}>AI</Text>ta</Text>
            <Text style={styles.headerSub}>Rescue Units Directory</Text>
          </View>

          {hasSearched && (
            <TouchableOpacity 
              style={styles.refreshBtn}
              onPress={fetchLocationAndNGOs}
              disabled={loading}
            >
              <RefreshCw size={18} color="#FB923C" />
            </TouchableOpacity>
          )}
        </View>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#FB923C" />
            <Text style={styles.loadingText}>Locating your coordinates...</Text>
          </View>
        ) : !hasSearched ? (
          <View style={styles.center}>
            <View style={styles.searchIconCircle}>
              <Search size={40} color="#FB923C" />
            </View>
            <Text style={styles.searchTitle}>Find Rescue Units</Text>
            <Text style={styles.searchSubtitle}>
              NGOX will use your GPS to find the 5 nearest rescue units.
            </Text>
            <TouchableOpacity style={styles.mainSearchBtn} onPress={fetchLocationAndNGOs}>
              <Text style={styles.mainSearchBtnText}>SEARCH NEARBY NGOs</Text>
              <Navigation size={18} color="#fff" style={{marginLeft:10}} />
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={ngos}
            renderItem={renderItem}
            keyExtractor={item => item.uuid || item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.center}>
                <ShieldAlert size={48} color="#CBD5E1" />
                <Text style={styles.emptyText}>No rescue units found.</Text>
                <TouchableOpacity onPress={() => setHasSearched(false)}>
                  <Text style={{color:'#FB923C', fontWeight:'bold', marginTop:10}}>Go Back</Text>
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 25,
    paddingVertical: 20
  },
  brand: { fontSize: 28, fontWeight: '900', color: '#0F172A', letterSpacing: -1.5 },
  headerSub: { fontSize: 13, color: '#94A3B8', fontWeight: '800', marginTop: -4 },
  refreshBtn: { 
    padding: 10, 
    backgroundColor: '#FFF7ED', 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFEDD5'
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  loadingText: { marginTop: 15, fontWeight: '800', color: '#94A3B8', fontSize: 14 },
  searchIconCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#FFF7ED', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  searchTitle: { fontSize: 24, fontWeight: '900', color: '#0F172A' },
  searchSubtitle: { textAlign: 'center', color: '#64748B', marginTop: 10, marginBottom: 35, lineHeight: 22, fontWeight: '500' },
  mainSearchBtn: { 
    backgroundColor: '#FB923C', 
    flexDirection: 'row', 
    paddingHorizontal: 30, 
    paddingVertical: 18, 
    borderRadius: 20
  },
  mainSearchBtnText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  listContainer: { padding: 20, paddingBottom: 100 },
  ngoCard: { 
    backgroundColor: '#fff', padding: 16, borderRadius: 24, flexDirection: 'row', marginBottom: 16,
    borderWidth: 1, borderColor: '#F1F5F9'
  },
  cardInfo: { flexDirection: 'row', flex: 1 },
  iconBg: { backgroundColor: '#FFF7ED', padding: 12, borderRadius: 16 },
  textContainer: { marginLeft: 15, flex: 1 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ngoName: { fontSize: 15, fontWeight: '900', color: '#0F172A', flex: 1 },
  distanceBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF7ED', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  distanceText: { fontSize: 10, fontWeight: '900', color: '#FB923C' },
  ngoEmail: { fontSize: 12, color: '#64748b', marginTop: 2 },
  locRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  address: { fontSize: 11, color: '#94A3B8', fontWeight: '700' },
  callButton: { backgroundColor: '#FB923C', padding: 14, borderRadius: 18, marginLeft: 10 },
  emptyText: { textAlign: 'center', color: '#94a3b8', fontWeight: '800', marginTop: 15 }
});
