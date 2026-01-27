// app/(tabs)/settings.tsx
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../auth/AuthContext';
import { useRouter } from 'expo-router';

export default function SettingsTab() {
  const { signOut } = useAuth(); // assuming you have a logout function
  const router = useRouter();

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          signOut();
          router.replace('/onboarding');
        },
      },
    ]);
  };

  const settingsItems = [
    { label: 'Profile', onPress: () => router.push('/') },
    { label: 'Notifications', onPress: () => router.push('/') },
    { label: 'Privacy', onPress: () => router.push('/') },
    { label: 'Language', onPress: () => router.push('/') },
    { label: 'About', onPress: () => router.push('/') },
    { label: 'Help & Support', onPress: () => router.push('/') },
    { label: 'Terms & Conditions', onPress: () => router.push('/') },
    { label: 'Sign Out', onPress: handleSignOut, destructive: true },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {settingsItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={item.onPress}
          style={[styles.item, item.destructive && styles.destructiveItem]}
        >
          <Text style={[styles.itemText, item.destructive && styles.destructiveText]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  destructiveItem: {
    backgroundColor: '#ffe5e5',
  },
  destructiveText: {
    color: '#d00',
    fontWeight: 'bold',
  },
});
