import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, ParamListBase } from '@react-navigation/native';
import { ParkingZone, Vehicle } from '../../../../types/types';

interface RootStackParamList extends ParamListBase {
  StartParking: { zone: ParkingZone };
}

interface StartParkingScreenProps {
  route: RouteProp<RootStackParamList, 'StartParking'>;
  navigation: any;
}

export default function StartParkingScreen({ route, navigation }: StartParkingScreenProps) {
  const { zone } = route.params;
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [duration, setDuration] = useState(60); // minutes

  const mockVehicles: Vehicle[] = [
    { id: '1', licensePlate: 'ABC 123', nickname: 'My Car' },
    { id: '2', licensePlate: 'XYZ 789', nickname: 'Work Van' },
  ];

  const calculatePrice = () => {
    return ((zone.pricePerHour * duration) / 60).toFixed(2);
  };

  const handleStartParking = () => {
    if (!selectedVehicle) return;
    // Here you would typically make an API call to start parking
    navigation.navigate('Map', {
      activeParking: {
        zoneId: zone.id,
        vehicle: selectedVehicle,
        startTime: new Date(),
        pricePerHour: zone.pricePerHour,
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.zoneInfo}>
          <View style={[styles.zoneColorDot, { backgroundColor: zone.color }]} />
          <View style={styles.zoneDetails}>
            <Text style={styles.zoneName}>{zone.name}</Text>
            <Text style={styles.zoneCode}>Zone {zone.code}</Text>
          </View>
          <Text style={styles.price}>€{zone.pricePerHour}/h</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Vehicle</Text>
        {mockVehicles.map((vehicle) => (
          <TouchableOpacity
            key={vehicle.id}
            style={[
              styles.vehicleItem,
              selectedVehicle?.id === vehicle.id && styles.selectedVehicle,
            ]}
            onPress={() => setSelectedVehicle(vehicle)}
          >
            <Ionicons
              name="car"
              size={24}
              color={selectedVehicle?.id === vehicle.id ? '#007AFF' : '#666'}
            />
            <View style={styles.vehicleInfo}>
              <Text style={styles.licensePlate}>{vehicle.licensePlate}</Text>
              <Text style={styles.nickname}>{vehicle.nickname}</Text>
            </View>
            {selectedVehicle?.id === vehicle.id && (
              <Ionicons name="checkmark-circle" size={24} color="#007AFF" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Duration</Text>
        <View style={styles.durationButtons}>
          {[30, 60, 120, 180].map((mins) => (
            <TouchableOpacity
              key={mins}
              style={[
                styles.durationButton,
                duration === mins && styles.selectedDuration,
              ]}
              onPress={() => setDuration(mins)}
            >
              <Text
                style={[
                  styles.durationText,
                  duration === mins && styles.selectedDurationText,
                ]}
              >
                {mins >= 60 ? `${mins / 60}h` : `${mins}m`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.totalSection}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalPrice}>€{calculatePrice()}</Text>
      </View>

      <TouchableOpacity
        style={[styles.startButton, !selectedVehicle && styles.startButtonDisabled]}
        onPress={handleStartParking}
        disabled={!selectedVehicle}
      >
        <Text style={styles.startButtonText}>Start Parking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    marginBottom: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  zoneInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  zoneColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  zoneDetails: {
    flex: 1,
  },
  zoneName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  zoneCode: {
    color: '#666',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
    marginBottom: 8,
  },
  selectedVehicle: {
    backgroundColor: '#007AFF20',
  },
  vehicleInfo: {
    flex: 1,
    marginLeft: 12,
  },
  licensePlate: {
    fontSize: 16,
    fontWeight: '500',
  },
  nickname: {
    color: '#666',
  },
  durationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  durationButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  selectedDuration: {
    backgroundColor: '#007AFF20',
  },
  durationText: {
    fontSize: 16,
    color: '#666',
  },
  selectedDurationText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    color: '#666',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  startButton: {
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonDisabled: {
    backgroundColor: '#007AFF80',
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
