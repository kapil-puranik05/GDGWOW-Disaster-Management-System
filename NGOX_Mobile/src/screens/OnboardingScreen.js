import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity
} from 'react-native';
import { ShieldAlert, Map, Volume2, ChevronRight } from 'lucide-react-native';
import { COLORS } from '../theme/color';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Instant SOS',
    description: 'One tap sends your precise GPS location to the nearest rescue teams and NGOs.',
    icon: <ShieldAlert size={100} color={COLORS.danger} />,
    color: '#fee2e2'
  },
  {
    id: '2',
    title: 'Find Safe Zones',
    description: 'Real-time maps showing government shelters, medical camps, and active NGO units.',
    icon: <Map size={100} color={COLORS.secondary} />,
    color: '#fff7ed'
  },
  {
    id: '3',
    title: 'Rescue Manuals',
    description: 'Access life-saving SOPs with multilingual offline support.',
    icon: <Volume2 size={100} color="#3b82f6" />,
    color: '#eff6ff'
  }
];

export default function OnboardingScreen({ navigation, onFinish }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // Call parent to hide onboarding
      onFinish?.();

      // Navigate to Login and prevent going back
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={SLIDES}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          ref={slidesRef}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </View>

      <View style={styles.footer}>
        {/* DOTS */}
        <View style={styles.dotContainer}>
          {SLIDES.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 22, 10],
              extrapolate: 'clamp'
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp'
            });

            return <Animated.View key={i} style={[styles.dot, { width: dotWidth, opacity }]} />;
          })}
        </View>

        {/* CTA */}
        <TouchableOpacity style={styles.button} onPress={handleNext} activeOpacity={0.9}>
          <Text style={styles.buttonText}>
            {currentIndex === SLIDES.length - 1 ? 'GET STARTED' : 'NEXT'}
          </Text>
          <ChevronRight color="#fff" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const OnboardingItem = ({ item }) => (
  <View style={[styles.itemContainer, { backgroundColor: item.color }]}>
    <View style={styles.iconCircle}>{item.icon}</View>
    <View style={styles.textContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  itemContainer: { width, padding: 40, alignItems: 'center', justifyContent: 'center' },
  iconCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16
  },
  textContainer: { marginTop: 50, alignItems: 'center' },
  itemTitle: { fontSize: 28, fontWeight: '900', color: COLORS.primary, textAlign: 'center' },
  itemDescription: {
    fontSize: 16,
    color: COLORS.slate600,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22
  },
  footer: { height: 150, justifyContent: 'space-between', paddingHorizontal: 40, paddingBottom: 40 },
  dotContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.secondary,
    marginHorizontal: 4
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: '800', marginRight: 6, fontSize: 14 }
});
