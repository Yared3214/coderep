import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import GlobalApi from '../Utils/GlobalApi';
import CourseItem from '../Components/CourseItem';
import ProgressCourseItem from '../Components/ProgressCourseItem';

export default function MyCourseScreen() {
  const [enrolledCoursesList, setEnrolledCoursesList] = useState();
  const {user} = useUser();
  useEffect(()=>{
    user&&getAllUserEnrollCourses();
  },[user])
  const getAllUserEnrollCourses = () => {
    GlobalApi.getAllUserEnrollCourses(user.emailAddresses).then(resp=>{
      setEnrolledCoursesList(resp.userEnrollCourses)
    })
  }
  return (
    <View style={{padding:20, marginTop:30}}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:27
      }}>My Course</Text>

      {/* list of course enrollment */}
      <FlatList
      data={enrolledCoursesList}
      renderItem={({item, index})=>(
        <ProgressCourseItem course={item.courseList}/>
  )}
      />
    </View>
  )
}