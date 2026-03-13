// app/(tabs)/settings.tsx

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../../../auth/AuthContext";
import { useRouter } from "expo-router";

export default function SettingsTab() {
  const { signOut, user } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.replace("/onboarding");
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Settings</Text>

      {/* User info */}
      <View style={styles.card}>
        <Text style={styles.label}>Account</Text>
        <Text style={styles.value}>
          {user?.email || "No email available"}
        </Text>
      </View>

      {/* Settings list */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Privacy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>About</Text>
        </TouchableOpacity>
      </View>

      {/* Sign out */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    color: "#666",
  },

  value: {
    fontSize: 16,
    marginTop: 5,
  },

  option: {
    paddingVertical: 12,
  },

  optionText: {
    fontSize: 16,
  },

  signOutButton: {
    marginTop: "auto",
    backgroundColor: "#ff3b30",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  signOutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});