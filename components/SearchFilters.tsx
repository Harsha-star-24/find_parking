import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchFiltersProps {
  activeFilters: string[];
  onFilterToggle: (filter: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

const filterOptions = [
  { id: 'available', icon: 'check-circle', label: 'Available Now' },
  { id: 'ev_charging', icon: 'electric-car', label: 'EV Charging' },
  { id: '24_hours', icon: 'access-time', label: '24/7 Access' },
  { id: 'covered', icon: 'garage', label: 'Covered' },
  { id: 'security', icon: 'security', label: 'Security' },
];

export default function SearchFilters({ activeFilters, onFilterToggle }: SearchFiltersProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {filterOptions.map((filter) => (
        <TouchableOpacity
          key={filter.id}
          style={[
            styles.filterButton,
            activeFilters.includes(filter.id) && styles.filterButtonActive
          ]}
          onPress={() => onFilterToggle(filter.id)}
        >
          <MaterialIcons
            name={filter.icon as any}
            size={16}
            color={activeFilters.includes(filter.id) ? '#fff' : '#666'}
          />
          <Text style={[
            styles.filterText,
            activeFilters.includes(filter.id) && styles.filterTextActive
          ]}>
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#fff',
  },
});