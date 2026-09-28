import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Home!</Text>
      <Text style={styles.subtitle}>You are successfully logged in.</Text>
      
      <Text style={styles.email}>
        Logged in as: {auth.currentUser?.email || auth.currentUser?.displayName || 'Unknown User'}
      </Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E4FA',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'GoogleSansFlex-36pt-Regular',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Gilmer-Regular',
    color: '#333',
    marginBottom: 30,
  },
  email: {
    fontSize: 16,
    fontFamily: 'Gilmer-Regular',
    color: '#555',
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'GoogleSansFlex-36pt-Regular',
  },
});
