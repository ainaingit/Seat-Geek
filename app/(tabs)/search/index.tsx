// app/search/index.tsx
import { useState } from 'react';
import { ScrollView, TextInput, View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function SearchIndex() {
  const [query, setQuery] = useState('');

  return (
    <>
      <Stack.Screen options={{ title: 'Search' }} />
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          placeholder="Search"
          value={query}
          onChangeText={setQuery}
          style={styles.searchBar}
        />
        {/* Add your scrollable content here */}
        <View style={{ height: 600 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
});
