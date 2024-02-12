import { View, Text, Image, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo'
import Colors from '../Utils/Colors';


export default function Header() {
    const {user} = useUser();
  return (
    <>
    <View style={{display:'flex', flexDirection:'row',gap:5, alignItems:'center'}}>
      <Image source={{uri:user?.imageUrl}}
      style={{width:45, height:45, borderRadius:99}}
      />
      <View>
      <Text style={{fontSize:18, fontFamily:'outfit'}}>Welcome</Text>
      <Text style={{fontSize:20, fontFamily:'outfit-bold', color:Colors.PRIMARY }}>Hello {user?.firstName}</Text>
      </View>
    </View>
    <View style={styles.input}>
    <Ionicons name="search" size={24} color={Colors.GRAY} />
        <TextInput style={{fontFamily:'outfit', width:'100%'}} placeholder='search'/>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    input:{
        backgroundColor:Colors.WHITE,
        padding:10,
        borderRadius:99,
        paddingHorizontal:20,
        marginTop:20,
        display:'flex',
        flexDirection:'row',
        gap:7,
        alignItems:'center',
        borderWidth:0.5,
        borderColor:Colors.PRIMARY
    }
})