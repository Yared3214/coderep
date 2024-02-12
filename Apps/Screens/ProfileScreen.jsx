import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useUser, useAuth } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Utils/Colors'
import { useNavigation } from '@react-navigation/native'

export default function ProfileScreen() {
  const navigation = useNavigation();
  const {user} = useUser();
  useEffect(()=>{
    
  },[])

  const SignOut = () => {
    const { isLoaded,signOut } = useAuth();
    if (!isLoaded) {
      return null;
    }
    return (
      <View>
        <TouchableOpacity onPress={()=>{signOut();}} style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center', paddingLeft:30, marginTop:30}}>
        <Ionicons name="power" size={24} color={Colors.PRIMARY} />
        <Text style={{fontFamily:'outfit-medium', fontSize:25}}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const onExplorePress = () => {
    navigation.navigate('Home')
  }
  const onMYCoursePress = () => {
    navigation.navigate('MyCourse')
  }

  return (
    <View style={{padding:20, marginTop:30}}>
      <View>
        <Text style={{fontSize:30, fontFamily:'outfit-bold'}}>Porfile</Text>
      </View>
      <View style={{ alignItems:'center', marginTop:30}}>
        <Image source={{uri:user?.imageUrl}} style={{height:100, width:100, borderRadius:99}}/>
        <Text style={{fontFamily:'outfit-bold', fontSize:26}}>{user.firstName}</Text>
        <Text style={{fontFamily:'outfit', fontSize:18}}>{user.emailAddresses[0].emailAddress}</Text>
      </View>
      <View style={{marginTop:60}}>
        <TouchableOpacity 
        onPress={onExplorePress}
        style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center', paddingLeft:30}}>
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <Text style={{fontFamily:'outfit-medium', fontSize:25}}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={onMYCoursePress}
        style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center', paddingLeft:30, marginTop:30}}>
        <Ionicons name="book" size={24} color={Colors.PRIMARY} />
        <Text style={{fontFamily:'outfit-medium', fontSize:25}}>My Course</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center', paddingLeft:30, marginTop:30}}>
        <Ionicons name="school" size={24} color={Colors.PRIMARY} />
        <Text style={{fontFamily:'outfit-medium', fontSize:25}}>Tesatef Academy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center', paddingLeft:30, marginTop:30}}>
        <Ionicons name="logo-youtube" size={24} color={Colors.PRIMARY} />
        <Text style={{fontFamily:'outfit-medium', fontSize:25}}>Youtube Channel</Text>
        </TouchableOpacity>
        <SignOut/>
      </View>
    </View>
  )
}