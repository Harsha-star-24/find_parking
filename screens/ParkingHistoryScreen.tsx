import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const mockParkingHistory = [
  {
    id: '1',
    zone: 'A1',
    date: '2024-04-15',
    duration: '2h 15min',
    cost: 9.00,
    vehicle: 'ABC 123',
  },
  {
    id: '2',
    zone: 'B2',
    date: '2024-04-14',
    duration: '1h 30min',
    cost: 4.50,
    vehicle: 'ABC 123',
  },
];

export default function ParkingHistoryScreen() {
  const renderParkingItem = ({ item }) => (
    <View style={styles.historyItem}>
      <View style={styles.headerRow}>
        <View style={styles.zoneTag}>
          <Text style={styles.zoneText}>Zone {item.zone}</Text>
        </View>
        <Text style={styles.cost}>€{item.cost.toFixed(2)}</Text>
      </View>
      <Text style={styles.vehicle}>{item.vehicle}</Text>
      <View style={styles.detailsRow}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.duration}>{item.duration}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Parking History</Text>
      </View>
      <FlatList
        data={mockParkingHistory}
        renderItem={renderParkingItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
  },
  historyItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  zoneTag: {
    backgroundColor: '#007AFF20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  zoneText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  cost: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  vehicle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    color: '#666',
  },
  duration: {
    color: '#666',
  },
});