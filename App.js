import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import LoginScreen from './Apps/Screens/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';
import './Apps/Utils/AppConfig'
import HomeScreen from './Apps/Screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';

import * as SecureStore from "expo-secure-store";
import TabNavigation from './Apps/Navigation/TabNavigation';
import HomeNavigation from './Apps/Navigation/HomeNavigation';


const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};



export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
  });
  return (
    <ClerkProvider tokenCache={tokenCache}
    publishableKey='pk_test_aW5ub2NlbnQtZG9scGhpbi03Ny5jbGVyay5hY2NvdW50cy5kZXYk'>
      <View style={styles.container}>
        <SignedIn>
        <NavigationContainer>
        <HomeNavigation/>
        </NavigationContainer>
        </SignedIn>
      <SignedOut>
        <LoginScreen/>
        </SignedOut>
      </View>
    </ClerkProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
});
