import { useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Animated,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { useAuth } from '../auth/AuthContext'
import { router } from 'expo-router'

const { width, height } = Dimensions.get('window')

const slides = [
  {
    title: 'Love it. Click it.\nTicket.',
    subtitle:
      "Get the seats you love to the events\nyou can’t miss as easy as 1, 2, 3, 4.",
  },
  {
    title: 'Discover live events',
    subtitle: 'Concerts, sports and shows\nnear you.',
  },
  {
    title: 'Buy with confidence',
    subtitle: 'Secure checkout.\nInstant tickets.',
  },
]

export default function AuthScreen() {
  const scrollX = useRef(new Animated.Value(0)).current
  const { signIn } = useAuth()

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/concert.jpeg')}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Gradient overlay */}
        <LinearGradient
          colors={['rgba(0,0,0,0.25)', 'rgba(0,0,0,0.9)']}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Skip */}
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipText}>SKIP</Text>
        </TouchableOpacity>

        {/* SLIDES AREA */}
        <View style={styles.slidesContainer}>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          >
            {slides.map((item, index) => (
              <View key={index} style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            ))}
          </Animated.ScrollView>
        </View>

        {/* PAGINATION */}
        <View style={styles.pagination}>
          {slides.map((_, i) => {
            const opacity = scrollX.interpolate({
              inputRange: [
                (i - 1) * width,
                i * width,
                (i + 1) * width,
              ],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            })
            return (
              <Animated.View
                key={i}
                style={[styles.dot, { opacity }]}
              />
            )
          })}
        </View>

        {/* BUTTONS */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/sign-up')}
          >
            <Text style={styles.primaryButtonText}>Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.secondaryButtonText}>Log in</Text>
          </TouchableOpacity>
        </View>


        {/* FOOTER */}
        <Text style={styles.footerText}>
          Terms of use | Privacy Policy
        </Text>
      </ImageBackground>
    </SafeAreaView>
  )
}

/* ========================= STYLES ========================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  background: {
    flex: 1,
  },

  skipButton: {
    position: 'absolute',
    top: 14,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
  },
  skipText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },

  slidesContainer: {
    flex: 1,
  },

  slide: {
    width,
    flex: 1,
    justifyContent: 'flex-start', // commence en dessous du centre
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: height * 0.55, // commence juste en dessous du centre
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 15,
    color: '#D1D5DB',
    textAlign: 'center',
    lineHeight: 22,
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },

  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    marginBottom: 40, // un peu plus haut que avant
  },

  primaryButton: {
    flex: 1,
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },

  secondaryButton: {
    flex: 1,
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },

  footerText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 14,
  },
})
