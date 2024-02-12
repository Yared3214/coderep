import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../Hooks/WarmUpBrowser'
import { useOAuth, useUser } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const {user} = useUser();
   useWarmUpBrowser();
   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    
  const onPress = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }
  
  // const handleSignUp = async () => {
  //   const token = await client.register();
  //   if (token) {
  //     console.log('user created account successfully')
  //     // User was authenticated
  //   }
  // };
  
  // const handleSignIn = async () => {
  //   const token = await client.login();
  //   if (token) {
  //     console.log('user authenticated')
  //     // User was authenticated
  //   }
  // };
  return (
    <View>
      <Image source={require('./../../assets/images/rocket.jpg')}
      style={{width:'100%', height:400, objectFit:'cover' }} 
      />
      <View style={{padding:20}}>
        <Text style={{fontSize:45, fontWeight:'bold'}}>welcome to
        <Text style={{color:Colors.PRIMARY}}>    codebox
        </Text>
        </Text>
        <Text style={{fontSize:20, marginTop:7, color:Colors.GRAY}}>Learn Programming to Build Real Life Projects </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={{marginTop:10, color:Colors.WHITE, textAlign:'center'}}>
            Sign In
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress=''>
        <Text style={{marginTop: 10, textAlign:'center', color:Colors.PRIMARY, fontSize:15}}>Create New Account</Text>
        </TouchableOpacity>
        
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
    button:{
        padding:20,
        backgroundColor:Colors.PRIMARY,
        borderRadius:99,
        marginTop:60
    }
})