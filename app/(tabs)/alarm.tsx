import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

// This configures how the app handles notifications while it is open
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      // Add these two to satisfy the new TypeScript definition:
      shouldShowBanner: true, 
      shouldShowList: true,
    }),
  });

export default function AlarmScreen() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Request permissions on mount for iOS/Android
    async function requestPermissions() {
      if (Platform.OS !== 'web') {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Enable notifications to use the alarm feature.');
        }
      }
    }
    requestPermissions();
  }, []);

  async function toggleAlarm() {
    if (Platform.OS === 'web') {
      Alert.alert("Web Support", "Notifications are only available on iOS and Android devices.");
      setIsEnabled(!isEnabled);
      return;
    }

    if (!isEnabled) {
      // Logic for enabling the alarm (Set for 5 seconds as a test)
      try {
        await Notifications.scheduleNotificationAsync({
          content: { 
            title: "MinimaTime", 
            body: "Time to wake up.",
            sound: true,
          },
          trigger: { 
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 5, 
            repeats: false 
          },
        });
      } catch (error) {
        console.error("Failed to schedule notification:", error);
      }
    } else {
      // Cancel all scheduled notifications if toggled off
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
    
    setIsEnabled(!isEnabled);
  }

  return (
    <View style={styles.container}>
      <View style={styles.alarmRow}>
        <View>
          <Text style={styles.alarmTime}>07:00</Text>
          <Text style={styles.alarmLabel}>WEEKDAYS</Text>
        </View>
        <Switch 
          trackColor={{ false: '#222', true: '#FFF' }}
          thumbColor={isEnabled ? '#000' : '#444'}
          onValueChange={toggleAlarm}
          value={isEnabled}
        />
      </View>
      {Platform.OS === 'web' && (
        <Text style={styles.webWarning}>Native features limited on Web</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000', 
    padding: 40, 
    justifyContent: 'center' 
  },
  alarmRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  alarmTime: { 
    color: '#FFF', 
    fontSize: 48, 
    fontWeight: '200',
    fontVariant: ['tabular-nums'] 
  },
  alarmLabel: { 
    color: '#444', 
    fontSize: 12, 
    letterSpacing: 2,
    marginTop: 4 
  },
  webWarning: {
    color: '#CC0000',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 20,
    textTransform: 'uppercase',
    letterSpacing: 1
  }
});