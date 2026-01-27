import { ScrollView, View, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Array.from({ length: 50 }).map((_, i) => (
        <View key={i} style={styles.item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flexGrow: 1 },
  item: { height: 100, marginBottom: 16, backgroundColor: 'skyblue', borderRadius: 8 },
});
