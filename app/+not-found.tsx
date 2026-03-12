import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      {/* Hide the header for the error screen to keep it clean */}
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.container}>
        <Text style={styles.title}>404</Text>
        <Text style={styles.subtitle}>PAGE NOT FOUND</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>RETURN HOME</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Matches your minimalist black theme
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 64,
    fontWeight: '100',
  },
  subtitle: {
    color: '#444',
    fontSize: 12,
    letterSpacing: 4,
    marginTop: 10,
    marginBottom: 40,
  },
  link: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
    paddingBottom: 4,
  },
  linkText: {
    fontSize: 12,
    color: '#FFF',
    letterSpacing: 2,
    fontWeight: '300',
  },
});