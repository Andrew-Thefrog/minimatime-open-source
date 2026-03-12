import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Vibration } from 'react-native';
import { Play, Pause, RotateCcw } from 'lucide-react-native';

export default function TimerScreen() {
  const [secondsLeft, setSecondsLeft] = useState(1500); // Default 25:00
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Logic to handle the countdown
  useEffect(() => {
    if (isActive && secondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      handleEnd();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, secondsLeft]);

  const handleEnd = () => {
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Minimalist alert: Haptic pulse
    if (Platform.OS !== 'web') {
      Vibration.vibrate([500, 500, 500]);
    } else {
      alert("Timer Finished");
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(1500); // Reset to 25 mins
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
      
      <View style={styles.controls}>
        <TouchableOpacity 
          onPress={resetTimer} 
          style={styles.secondaryButton}
          activeOpacity={0.7}
        >
          <RotateCcw color="#333" size={28} strokeWidth={1.5} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.mainButton} 
          onPress={toggleTimer}
          activeOpacity={0.9}
        >
          {isActive ? (
            <Pause color="#000" size={32} fill="#000" />
          ) : (
            <Play color="#000" size={32} fill="#000" style={{ marginLeft: 4 }} />
          )}
        </TouchableOpacity>

        {/* Placeholder for "Set Time" button */}
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setSecondsLeft(secondsLeft + 60)} // Add 1 min
        >
          <Text style={styles.plusOne}>+1M</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    color: '#FFF',
    fontSize: 110,
    fontWeight: '100',
    fontVariant: ['tabular-nums'],
    letterSpacing: -4,
    marginBottom: 60,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
  },
  mainButton: {
    backgroundColor: '#FFF',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusOne: {
    color: '#333',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  }
});