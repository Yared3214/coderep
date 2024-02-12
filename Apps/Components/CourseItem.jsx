import { View, Text, Image, TouchableOpacity, useAnimatedValue } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../Utils/Colors'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

export default function CourseItem({course}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
    onPress={()=>navigation.navigate('course-detail', {
      course:course,
    })}
    style={{backgroundColor:Colors.WHITE, width:260, marginRight:15, padding:10,
    borderRadius:10, gap:4}}>
      <Image source={{uri:course.banner.url}}
      style={{width:240, borderRadius:15, height:130}}
      />
      <View style={{display:'flex', gap:3}}>
        <Text style={{fontSize:16, fontFamily:'outfit-bold'}}>{course.name}</Text>
        <Text style={{fontSize:16, fontFamily:'outfit', color:Colors.GRAY}}>{course.author}</Text>
        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <View style={{display:'flex', flexDirection:'row', gap:4, alignItems:'center'}}>
        <Ionicons name="book" size={24} color={Colors.PRIMARY} />
          <Text style={{fontFamily:'outfit', color:Colors.GRAY}}>{course.totalChapters} chapters</Text>
        </View>
        <Text  style={{fontFamily:'outfit-bold', color:Colors.PRIMARY}}>{course.free?'Free':'Paid'}</Text>
        </View>

      </View>
    </TouchableOpacity>
  )
}