import React, { useState } from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';

const { width } = Dimensions.get('window');

const concerts = [
  {
    id: '1',
    title: 'Imagine Dragons Live',
    venue: 'Stade de Madagascar',
    date: '2026-02-10',
    price: '$120',
    image: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2',
  },
  {
    id: '2',
    title: 'Coldplay World Tour',
    venue: 'Antananarivo Arena',
    date: '2026-03-05',
    price: '$150',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
  },
  {
    id: '3',
    title: 'Burna Boy Live',
    venue: 'Open Air Concert',
    date: '2026-04-20',
    price: '$90',
    image: 'https://images.unsplash.com/photo-1488372759479-9014e134d05b',
  },
];

export default function MainScreen() {
  const [search, setSearch] = useState('');

  const filteredConcerts = concerts.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleBook = (id: string) => alert('Book ticket for concert ' + id);

  const renderConcert = ({ item }: { item: typeof concerts[0] }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleBook(item.id)}>
      <ImageBackground source={{ uri: item.image }} style={styles.image} imageStyle={{ borderRadius: 16 }}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.date} • {item.venue}</Text>
        </View>
        <View style={styles.bookButtonContainer}>
          <Text style={styles.bookButtonText}>Book</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.header}>Discover Concerts</Text>

      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search concerts..."
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* LIST */}
      <FlatList
        data={filteredConcerts}
        keyExtractor={(item) => item.id}
        renderItem={renderConcert}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  header: { fontSize: 26, fontWeight: '700', marginBottom: 12, paddingHorizontal: 16 },

  // Search Bar - Liquid Glass effect
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  searchInput: {
    color: '#111',
    fontSize: 16,
  },

  card: { marginBottom: 16, marginHorizontal: 16, borderRadius: 16, overflow: 'hidden' },
  image: { width: width - 32, height: 180, justifyContent: 'space-between' },
  overlay: { backgroundColor: 'rgba(0,0,0,0.4)', padding: 12, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  title: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 4 },
  date: { color: '#fff', fontSize: 14 },
  bookButtonContainer: {
    backgroundColor: '#EF4444',
    alignSelf: 'flex-end',
    margin: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  bookButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});
