import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      
      <Text style={styles.title}>MinimaTime</Text>
      <View style={styles.separator} />
      
      <Text style={styles.description}>
        A minimalist open-source time management tool focused on intentionality.
      </Text>

      <Text style={styles.version}>v1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '200',
    color: '#FFF',
    letterSpacing: 2,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '20%',
    backgroundColor: '#333',
  },
  description: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: '80%',
  },
  version: {
    position: 'absolute',
    bottom: 40,
    color: '#222',
    fontSize: 12,
    letterSpacing: 1,
  }
});