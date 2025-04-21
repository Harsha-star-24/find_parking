import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

// Dynamically load react-native-maps only on native platforms
let MapView: any, Marker: any, Polygon: any;
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
  Polygon = Maps.Polygon;
}
import { ParkingSpot, ParkingZone } from '../types/types';
import { BlurView } from 'expo-blur';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeParking, setActiveParking] = useState(null);
  const [selectedZone, setSelectedZone] = useState<ParkingZone | null>(null);

  const parkingZones: ParkingZone[] = [
    {
      id: '1',
      code: 'A1',
      name: 'City Center',
      color: '#FF595E',
      pricePerHour: 4.50,
      restrictions: ['Mon-Sat 8:00-20:00'],
    },
    {
      id: '2',
      code: 'B2',
      name: 'Shopping District',
      color: '#87B37A',
      pricePerHour: 3.00,
      restrictions: ['Mon-Fri 9:00-18:00'],
    },
  ];

  const renderActiveParking = () => {
    if (!activeParking) return null;
    
    return (
      <BlurView intensity={70} style={styles.activeParkingContainer}>
        <View style={styles.activeParkingContent}>
          <Ionicons name="time" size={24} color="#007AFF" />
          <View style={styles.activeParkingInfo}>
            <Text style={styles.activeParkingTitle}>Active Parking</Text>
            <Text style={styles.activeParkingZone}>Zone A1 • 2:45:30</Text>
          </View>
          <TouchableOpacity 
            style={styles.stopButton}
            onPress={() => setActiveParking(null)}
          >
            <Text style={styles.stopButtonText}>STOP</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    );
  };

  const renderZoneInfo = () => {
    if (!selectedZone) return null;

    return (
      <View style={styles.zoneInfoContainer}>
        <View style={styles.zoneHeader}>
          <View style={[styles.zoneColorDot, { backgroundColor: selectedZone.color }]} />
          <Text style={styles.zoneName}>{selectedZone.name}</Text>
          <Text style={styles.zoneCode}>Zone {selectedZone.code}</Text>
        </View>
        <View style={styles.zoneDetails}>
          <Text style={styles.zonePrice}>€{selectedZone.pricePerHour.toFixed(2)}/hour</Text>
          <Text style={styles.zoneRestrictions}>{selectedZone.restrictions[0]}</Text>
        </View>
        <TouchableOpacity 
          style={styles.startParkingButton}
          onPress={() => navigation.navigate('StartParking', { zone: selectedZone })}
        >
          <Text style={styles.startParkingButtonText}>Start Parking</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for parking zones..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={32} color="#007AFF" />
        </TouchableOpacity>
      </View>      <View style={styles.mapContainer}>
        {Platform.OS !== 'web' ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0121,
            }}
            showsUserLocation
            showsMyLocationButton
          >
            {parkingZones.map((zone) => (
              <Polygon
                key={zone.id}
                coordinates={[
                  { latitude: 37.78825, longitude: -122.4324 },
                  { latitude: 37.78925, longitude: -122.4324 },
                  { latitude: 37.78925, longitude: -122.4344 },
                  { latitude: 37.78825, longitude: -122.4344 },
                ]}
                fillColor={`${zone.color}50`}
                strokeColor={zone.color}
                strokeWidth={2}
                onPress={() => setSelectedZone(zone)}
              />
            ))}
          </MapView>
        ) : (
          <View style={[styles.map, styles.webMapFallback]}>
            <Text style={styles.webMapText}>Web map not supported</Text>
          </View>
        )}
      </View>

      {renderActiveParking()}
      {renderZoneInfo()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginRight: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    fontSize: 16,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  activeParkingContainer: {
    position: 'absolute',
    top: 80,
    left: 16,
    right: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  activeParkingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  activeParkingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  activeParkingTitle: {
    fontSize: 14,
    color: '#666',
  },
  activeParkingZone: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stopButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  stopButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  zoneInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  zoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  zoneColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  zoneName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  zoneCode: {
    fontSize: 16,
    color: '#666',
  },
  zoneDetails: {
    marginBottom: 16,
  },
  zonePrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  zoneRestrictions: {
    color: '#666',
  },
  startParkingButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startParkingButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  webMapFallback: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  webMapText: {
    color: '#666',
    fontSize: 16,
  },
});