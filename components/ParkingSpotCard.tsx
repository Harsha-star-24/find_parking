import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ParkingSpot } from '../types/types';

interface ParkingSpotCardProps {
  spot: ParkingSpot;
  onPress: () => void;
}

export default function ParkingSpotCard({ spot, onPress }: ParkingSpotCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: spot.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{spot.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{spot.rating}</Text>
          </View>
        </View>
        <Text style={styles.address}>{spot.address}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>${spot.price}/hr</Text>
          <View style={styles.details}>
            <Text style={styles.available}>{spot.available} spots available</Text>
            <Text style={styles.distance}>{spot.distance} mi</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '600',
  },
  address: {
    color: '#666',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  details: {
    alignItems: 'flex-end',
  },
  available: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  distance: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
});