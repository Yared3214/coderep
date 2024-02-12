import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../Utils/Colors'

export default function EnrollmentSection({userEnrollment, onEnrollmentPress, course}) {
  return (
    <View style={{padding:15, backgroundColor:Colors.PRIMARY, borderRadius:10}}>
      {!course?.chapter[0]&&<TouchableOpacity
      onPress={()=>Linking.openURL(course.youtubeUrl)}>
      <Text style={{textAlign:'center',
      fontFamily:'outfit-medium', 
      color:Colors.WHITE}}>Watch on Youtube</Text>
      </TouchableOpacity>}
      {course?.chapter[0]&&userEnrollment?.length>0?
      <TouchableOpacity
      onPress={()=>console.log('continued')}>
      <Text style={{textAlign:'center', 
      fontFamily:'outfit-medium', 
      color:Colors.WHITE}}>Continue</Text>
      </TouchableOpacity>
    :
      course?.chapter[0]&&<TouchableOpacity
    onPress={()=>onEnrollmentPress()}>
      <Text style={{textAlign:'center', 
    fontFamily:'outfit-medium', 
    color:Colors.WHITE}}>Enroll To Course</Text>
    </TouchableOpacity>}
    </View>
  )
}