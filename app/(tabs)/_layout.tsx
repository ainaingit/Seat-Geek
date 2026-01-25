import { Tabs, Redirect } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { View, ActivityIndicator } from 'react-native'
import { useAuth } from '../../auth/AuthContext'

export default function TabsLayout() {
  const { user, loading } = useAuth()

  // While restoring session → block UI
  if (loading) {
    return (
      <View >
        <ActivityIndicator size="large" />
      </View>
    )
  }

  // Not authenticated → kick out
  if (!user) {
    return <Redirect href="/onboarding" />
  }

  // Authenticated → render tabs
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          
        },
      }}
    >
      <Tabs.Screen
        name="main"
        options={{
          title: 'Main',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="second"
        options={{
          title: 'Second',
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="third"
        options={{
          title: 'Third',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
