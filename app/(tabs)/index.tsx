import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Platform } from 'react-native';
import { Settings, X } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@minimatime_24hr';

export default function ClockScreen() {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // 1. Load preference on mount
  useEffect(() => {
    const loadPreference = async () => {
      try {
        const savedValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedValue !== null) {
          setIs24Hour(JSON.parse(savedValue));
        }
      } catch (e) {
        console.error("Failed to load settings", e);
      }
    };

    loadPreference();

    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Save preference when toggled
  const toggleFormat = async () => {
    const newValue = !is24Hour;
    setIs24Hour(newValue);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
    } catch (e) {
      console.error("Failed to save settings", e);
    }
  };

  const formatTime = () => {
    return time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: !is24Hour,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.settingsButton} 
        onPress={() => setModalVisible(true)}
      >
        <Settings color="#333" size={24} strokeWidth={1.5} />
      </TouchableOpacity>

      <Text style={styles.timeText}>{formatTime()}</Text>
      
      <Text style={styles.dateText}>
        {time.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }).toUpperCase()}
      </Text>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <X color="#FFF" size={24} />
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>SETTINGS</Text>
            
            <TouchableOpacity style={styles.optionRow} onPress={toggleFormat}>
              <Text style={styles.optionText}>24-HOUR FORMAT</Text>
              <View style={[styles.radio, is24Hour && styles.radioActive]} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  settingsButton: { position: 'absolute', top: 60, right: 30 },
  timeText: { 
    color: '#FFF', 
    fontSize: 72, 
    fontWeight: '200', 
    fontVariant: ['tabular-nums'],
    ...Platform.select({
      ios: { fontFamily: 'Courier' },
      android: { fontFamily: 'monospace' },
      web: { fontFamily: 'monospace' }
    })
  },
  dateText: { color: '#444', fontSize: 14, letterSpacing: 4, marginTop: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', padding: 30, borderRadius: 20, backgroundColor: '#111' },
  closeButton: { alignSelf: 'flex-end', marginBottom: 10 },
  modalTitle: { color: '#444', fontSize: 12, letterSpacing: 3, marginBottom: 30 },
  optionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  optionText: { color: '#FFF', fontSize: 16, fontWeight: '300' },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: '#444' },
  radioActive: { backgroundColor: '#FFF', borderColor: '#FFF' },
});