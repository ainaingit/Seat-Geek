// app/(tabs)/index.tsx
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

export default function HomeScreen() {
  const screenWidth = Dimensions.get('window').width;
  const isSmallScreen = screenWidth < 400; // petit écran

  const concerts = Array.from({ length: 10 }, (_, i) => ({
    id: i.toString(),
    name: `Concert ${i + 1}`,
    date: `2026-02-${(i % 28) + 1}`,
    venue: `Venue ${i + 1}`,
    image: `https://picsum.photos/seed/${i + 1}/500/300`,
  }));

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {concerts.map((concert) => (
        <View
          key={concert.id}
          style={[
            styles.card,
            isSmallScreen ? styles.cardRow : styles.cardColumn,
          ]}
        >
          <Image
            source={{ uri: concert.image }}
            style={[
              styles.image,
              isSmallScreen ? styles.imageSmallRight : styles.imageLargeTop,
            ]}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{concert.name}</Text>
            <Text style={styles.details}>{concert.date} • {concert.venue}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Buy Ticket</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    flexGrow: 1, // essentiel pour minimizeBehavior
  },
  card: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
    flex: 1,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardColumn: {
    flexDirection: 'column',
  },
  image: {
    borderRadius: 12,
  },
  imageSmallRight: {
    width: 120,
    height: 120,
    marginLeft: 16,
  },
  imageLargeTop: {
    width: '100%',
    height: 200,
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
