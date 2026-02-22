// app/(tabs)/settings.tsx

import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "../../../auth/AuthContext";
import { useRouter } from "expo-router";

export default function SettingsTab() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.replace("/onboarding");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 10,
    fontSize: 18,
  },
});