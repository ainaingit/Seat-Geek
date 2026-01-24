import { useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { router } from 'expo-router'

const { width, height } = Dimensions.get('window')

/* ========================= DATA ========================= */

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

const backgrounds = [
  require('../assets/concert.jpeg'),
  require('../assets/vip-ticket.jpeg'),
  require('../assets/discover.jpeg'),
]

/* ========================= COMPONENT ========================= */

export default function AuthScreen() {
  const scrollX = useRef(new Animated.Value(0)).current

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        {backgrounds.map((image, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          })

          const blurIntensity = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [30, 0, 30],
            extrapolate: 'clamp',
          })

          return (
            <Animated.View
              key={index}
              style={[
                StyleSheet.absoluteFillObject,
                { opacity },
              ]}
            >
              {/* IMAGE */}
              <Animated.Image
                source={image}
                resizeMode="cover"
                style={[
                  StyleSheet.absoluteFillObject,
                  { transform: [{ scale: 1.1 }] },
                ]}
              />

              {/* DYNAMIC BLUR */}
              <Animated.View style={StyleSheet.absoluteFillObject}>
                <BlurView
                  intensity={0}
                  tint="dark"
                  style={StyleSheet.absoluteFillObject}
                />
                <Animated.View
                  pointerEvents="none"
                  style={[
                    StyleSheet.absoluteFillObject,
                    {
                      opacity: blurIntensity.interpolate({
                        inputRange: [0, 30],
                        outputRange: [0, 1],
                      }),
                    },
                  ]}
                >
                  <BlurView
                    intensity={30}
                    tint="dark"
                    style={StyleSheet.absoluteFillObject}
                  />
                </Animated.View>
              </Animated.View>
            </Animated.View>
          )
        })}

        {/* GRADIENT */}
        <LinearGradient
          colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.9)']}
          style={StyleSheet.absoluteFillObject}
        />

        {/* SLIDES */}
        <View style={styles.slidesContainer}>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
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
            onPress={() => router.push('/auth-screen')}
          >
            <Text style={styles.secondaryButtonText}>Log in</Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <Text style={styles.footerText}>
          Terms of use | Privacy Policy
        </Text>
      </View>
    </View>
  )
}

/* ========================= STYLES ========================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  backgroundContainer: {
    flex: 1,
  },

  slidesContainer: {
    flex: 1,
  },

  slide: {
    width,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: height * 0.55,
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
    marginBottom: 40,
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
    marginBottom: 40,
  },
})
