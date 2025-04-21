import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchHistoryProps {
  history: string[];
  onSelectHistory: (search: string) => void;
  onClearHistory: () => void;
}

export default function SearchHistory({ history, onSelectHistory, onClearHistory }: SearchHistoryProps) {
  if (history.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Searches</Text>
        <TouchableOpacity onPress={onClearHistory}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {history.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.historyItem}
            onPress={() => onSelectHistory(item)}
          >
            <MaterialIcons name="history" size={20} color="#666" />
            <Text style={styles.historyText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 16,
    marginTop: 0,
    padding: 16,
    maxHeight: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  clearText: {
    color: '#007AFF',
    fontSize: 14,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  historyText: {
    marginLeft: 12,
    color: '#333',
    fontSize: 14,
  },
});