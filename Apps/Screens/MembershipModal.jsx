import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Colors from './../Utils/Colors'
import { useUser } from '@clerk/clerk-expo'
import GlobalApi from '../Utils/GlobalApi';
import { MembershipContext } from '../Navigation/HomeNavigation';

export default function MembershipModal() {
  const {isMember, setIsMember} = useContext(MembershipContext);
  const [selectedMembership, setSelectedMembership] = useState();
  const {user} = useUser();
  const navigation = useNavigation()
  const saveNewMembership = () => {
    GlobalApi.createNewMembership(user.emailAddresses).then(resp=>{
      if(resp){
        setIsMember(true)
        Alert.alert('Great!!!', 'Thank you for joining membership.',[{
          text:'Ok',
          onPress:()=>navigation.goBack(),
          style:'cancel'
        }])
      }
    })
  }
  return (
    <View>
      <View>
        <Image source={require('./../../assets/images/rocket2.jpg')}
        style={{height:350, width:'100%',}}/>
        <Text style={{fontSize:30, fontFamily:'outfit-bold', marginTop:-325, padding:15}}>Upgrade to Pro</Text>
      </View>
      <View style={{display:'flex',flexDirection:'row',gap:75,justifyContent:'center', marginTop:300, alignItems:'center'}}>
        <TouchableOpacity 
        onPress={()=>setSelectedMembership(4.99)}
        style={[{display:'flex', 
        flexDirection:'column', 
        alignContent:'center', 
        padding:20, 
        borderRadius:10, 
        borderWidth:0.5,
        shadowColor:Colors.PRIMARY,
        shadowOffset:{width:0, height:2},
        justifyContent:'center'}, selectedMembership == 4.99 && {
          borderColor: Colors.PRIMARY,
          backgroundColor: Colors.PRIMARY_LIGHT
        }]}>
          <Text style={{fontSize:25, fontFamily:'outfit'}}>1 Month</Text>
          <View style = {styles.lineStyle}/>
          <Text style={{fontSize:30, fontFamily:'outfit-bold', paddingLeft:4}}>$4.99</Text>
          
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>setSelectedMembership(36.99)}
        style={[{display:'flex', 
        flexDirection:'column', 
        padding:20, borderRadius:10, 
        borderWidth:0.4, 
        borderWidth:0.5,
        shadowColor:Colors.PRIMARY,
        shadowOffset:{width:0, height:2},
        justifyContent:'center'}, selectedMembership == 36.99 && {
          borderColor: Colors.PRIMARY,
          backgroundColor: Colors.PRIMARY_LIGHT
        }]}>
          <Text style={{fontSize:25, fontFamily:'outfit', paddingLeft:15}}>1 Year</Text>
          <View style = {styles.lineStyle}/>
          <Text style={{fontSize:30, fontFamily:'outfit-bold'}}>$39.99</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
      onPress={()=>selectedMembership&&saveNewMembership()}
      style={{alignItems:'center', margin:25, backgroundColor:Colors.PRIMARY, padding:20, borderRadius:10}}>
        <Text style={{color:'white', fontFamily:'outfit', fontSize:15}}>Get Membership Now</Text>
      </TouchableOpacity>
      <View style={{marginTop:-10}}>
        <Text style={{color:Colors.GRAY, fontFamily:'outfit', fontSize:17, marginLeft:40}}>
             You can purchase the membership to access all
        </Text>
        <Text style={{color:Colors.GRAY, fontFamily:'outfit', fontSize:17, marginLeft:60}}>
             courses along with source code and extras.
        </Text>
        <Text style={{color:Colors.GRAY, fontFamily:'outfit', fontSize:17, marginLeft:25, marginTop:10}}>
             If you want to cancel membership then email us on:
        </Text>
        <Text style={{color:Colors.GRAY, fontFamily:'outfit', fontSize:17, marginLeft:100}}>
            admin@codeyared@gmail.com
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  lineStyle:{
        marginTop:-0.1,
        borderWidth: 0.5,
        borderColor:Colors.GRAY,
        marginBottom:5,
   }
 });