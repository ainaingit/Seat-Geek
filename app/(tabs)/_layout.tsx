import { Redirect } from 'expo-router'
import { NativeTabs, Badge, Icon } from 'expo-router/unstable-native-tabs'
import { View, ActivityIndicator } from 'react-native'
import { useAuth } from '../../auth/AuthContext'

export default function TabLayout() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!user) {
    return <Redirect href="/onboarding" />
  }

  return (
    <NativeTabs minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: 'house', selected: 'house.fill' }} />
      </NativeTabs.Trigger>

     

      <NativeTabs.Trigger name="settings">
        <Badge>9+</Badge>
        <Icon sf={{ default: 'gear', selected: 'gear.fill' }} />
      </NativeTabs.Trigger>

       <NativeTabs.Trigger name="search" role="search">
        <Icon sf={{ default: 'magnifyingglass' }} />
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
