import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import SectionHeading from './../Components/SectionHeading'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Utils/Colors';

export default function LessonSection({course, userEnrollment}) {
    const [isEnrolled, setIsEnrolled] = useState(false);
  return (
    <View style={{marginBottom:20}}>
       <SectionHeading heading={'Lessons'}/>
       <FlatList
       data={course?.chapter}
       renderItem={({item, index})=>(
        <TouchableOpacity style={{display:'flex', flexDirection:'row', justifyContent:'space-between',
         alignItems:'center', padding:15, borderWidth:0.5, marginBottom:10, borderRadius:10}}>
            <View style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}>
            <Text style={{
                fontSize:17,
                padding:10,
                fontFamily:'outfit',
                backgroundColor:Colors.PRIMARY_LIGHT,
                width:40,
                height:40,
                textAlign:'center',
                color:Colors.PRIMARY
            }}>{index+1}</Text>
            <Text style={{fontFamily:'outfit-medium', fontSize:17}}>{item.name}</Text>
            </View>
           {userEnrollment?.length>0||index==0?<Ionicons name="play-circle" size={34} color={Colors.PRIMARY} />
            :<Ionicons name="lock-closed" size={34} color={Colors.GRAY} />}
        </TouchableOpacity>
       )}
       />
    </View>
  )
}