import { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking as RNLinking,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import * as Linking from 'expo-linking'
import { useAuth } from '../auth/AuthContext'
import { supabase } from '../database/supabase'

const { height } = Dimensions.get('window')

export default function SignUpScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

   // Show alert for terms and privacy
  const handleTerms = (type: 'terms' | 'privacy') => {
    if (type === 'terms') {
      Alert.alert('Terms of Use', 'Here you can show your Terms of Use content.')
    } else {
      Alert.alert('Privacy Policy', 'Here you can show your Privacy Policy content.')
    }
  }

  // Navigate to home if already logged in
  useEffect(() => {
    if (user) router.replace('/(tabs)')
  }, [user])

  const openLink = (url: string) => {
    RNLinking.openURL(url)
  }

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password')
      return
    }
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error

      if (data.session) {
        // Email confirmation is disabled in your Supabase project settings,
        // so the user is already signed in.
        router.replace('/(tabs)')
      } else {
        // Email confirmation required — no session yet, don't send them into the app.
        Alert.alert('Success', 'Account created! Please check your email to verify your account before logging in.')
        router.replace('/auth-screen')
      }
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // NOTE: Platform.select({ web: window.location.origin, ... }) looks safe but
  // isn't: JS evaluates every value in an object literal up front, so
  // `window.location.origin` runs even on iOS/Android and crashes with
  // "window is not defined". Using a plain conditional avoids that, and
  // Linking.createURL() gives a real deep link (using the "seatgeek" scheme
  // from app.json) instead of a hardcoded localhost URL that only works in
  // old Expo Go.
  const getOAuthRedirectUrl = () =>
    Platform.OS === 'web' ? window.location.origin : Linking.createURL('/auth-screen')

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: getOAuthRedirectUrl(),
        },
      })
      if (error) throw error
    } catch (error: any) {
      Alert.alert('Google Sign Up Failed', error.message || 'Something went wrong')
    }
  }

  const handleAppleLogin = async () => {
    if (Platform.OS !== 'ios') {
      Alert.alert('Apple Sign Up', 'Apple Sign Up is only available on iOS')
      return
    }
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: getOAuthRedirectUrl(),
        },
      })
      if (error) throw error
    } catch (error: any) {
      Alert.alert('Apple Sign Up Failed', error.message || 'Something went wrong')
    }
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.subtitle}>
          Sign up to start discovering live events
        </Text>
      </View>

      {/* FORM */}
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryButtonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* DIVIDER WITH OR */}
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* OAUTH STACK */}
      <View style={styles.oauthContainer}>
        <TouchableOpacity style={styles.oauthButton} onPress={handleGoogleLogin}>
          <FontAwesome name="google" size={18} color="#EA4335" />
          <Text style={styles.oauthText}>Continue with Google</Text>
        </TouchableOpacity>

        {Platform.OS === 'ios' && (
          <TouchableOpacity style={styles.oauthButton} onPress={handleAppleLogin}>
            <FontAwesome name="apple" size={18} color="#000" />
            <Text style={styles.oauthText}>Continue with Apple</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* LOGIN LINK */}
      <TouchableOpacity onPress={() => router.push('/auth-screen')}>
        <Text style={styles.signupText}>
          Already have an account? <Text style={styles.signupLink}>Log in</Text>
        </Text>
      </TouchableOpacity>

      {/* TERMS & POLICY pinned at bottom */}
      <View style={styles.termsContainer}>
        <TouchableOpacity onPress={() => handleTerms('terms')}>
          <Text style={styles.termsText}>Terms of Use</Text>
        </TouchableOpacity>
        <Text style={styles.separator}> | </Text>
        <TouchableOpacity onPress={() => handleTerms('privacy')}>
          <Text style={styles.termsText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

/* ========================= STYLES ========================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: height * 0.12,
    justifyContent: 'flex-start',
  },

  header: {
    marginBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#6B7280',
  },

  form: {
    gap: 14,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },

  primaryButton: {
    marginTop: 12,
    height: 52,
    backgroundColor: '#111827',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonDisabled: {
    opacity: 0.6,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  dividerText: {
    marginHorizontal: 12,
    fontSize: 13,
    color: '#6B7280',
  },

  oauthContainer: {
    gap: 12,
    marginBottom: 24,
  },

  oauthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
  },

  oauthText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },

  signupText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },

  signupLink: {
    color: '#111827',
    fontWeight: '600',
  },

  termsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 8,
  },

  termsText: {
    fontSize: 12,
    color: '#6B7280',
    textDecorationLine: 'underline',
  },

  separator: {
    marginHorizontal: 6,
    fontSize: 12,
    color: '#6B7280',
  },
})
