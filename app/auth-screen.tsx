import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useAuth } from '../auth/AuthContext'

const { height } = Dimensions.get('window')

export default function AuthScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useAuth()
  const [loading, setLoading] = useState(false)

  // Email/password login using AuthContext.signIn ONLY
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password')
      return
    }
    try {
      setLoading(true)
      await signIn(email, password) // <- AuthContext function
      router.replace('/(tabs)/main')
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // Show alert for terms and privacy
  const handleTerms = (type: 'terms' | 'privacy') => {
    if (type === 'terms') {
      Alert.alert('Terms of Use', 'Here you can show your Terms of Use content.')
    } else {
      Alert.alert('Privacy Policy', 'Here you can show your Privacy Policy content.')
    }
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Sign in to continue discovering live events
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

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>Log in</Text>
        </TouchableOpacity>
      </View>

      {/* SIGN UP LINK */}
      <TouchableOpacity onPress={() => router.push('/sign-up')}>
        <Text style={styles.signupText}>
          Don’t have an account? <Text style={styles.signupLink}>Sign up</Text>
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
    justifyContent: 'center', // center everything vertically
  },

  header: {
    marginBottom: 40,
    alignItems: 'center',
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
    textAlign: 'center',
  },

  form: {
    gap: 14,
    marginBottom: 24,
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

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
