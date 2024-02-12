import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';
import CourseIntro from '../Components/CourseIntro';
import SourceSection from '../Components/SourceSection';
import EnrollmentSection from '../Components/EnrollmentSection';
import LessonSection from '../Components/LessonSection';
import GlobalApi from '../Utils/GlobalApi';
import { MembershipContext } from '../Navigation/HomeNavigation';
import Colors from '../Utils/Colors';

export default function CourseDetailScreen() {
  // const [isMember, setIsMember] = useState();
  const {isMember, setIsMember} = useContext(MembershipContext);
  const [userEnrollment, setUserEnrollment] = useState();
  const {user} = useUser();
  const navigation = useNavigation();
  const {params} = useRoute();
  const [course, setCourse] = useState();
  useEffect(()=>{
    setCourse(params.course)
    params&&user&&checkIsUserEnrollToCourse(params.course)

  },[params&&user])
  //  useEffect(()=>{
  //       checkUserMembership();
  //  },[])
  const checkIsUserEnrollToCourse = (course) => {
    GlobalApi.checkUserCourseEnrollment(course?.slug, user?.emailAddresses).then(resp=>{
      setUserEnrollment(resp?.userEnrollCourses)
    })
  }
  // const checkUserMembership = () => {
  //   GlobalApi.checkMembership(user.emailAddresses).then(resp=>{
  //     setIsMember(resp.memberships?.length>0)
  //   })
  // }
  const onEnrollmentPress = () => {
    if (course?.free) {
      saveUserEnrollment();
    }else{
      if(!isMember){
        navigation.navigate('membership')
        return;
      }
      saveUserEnrollment();
    }
  }
  const saveUserEnrollment = () => {
    GlobalApi.saveUserCourseEnrollment(course.slug, user.emailAddresses).then(resp=>{
      if(resp){
        Alert.alert('Great!!!', 'You just enrolled to new course.',[{
          text:'Ok',
          onPress:()=>console.log('ok pressed'),
          style:'cancel'
        }])
        checkIsUserEnrollToCourse(course);
      }
    })
  }
  return (
    <ScrollView style={{marginTop:25, padding:20, backgroundColor:Colors.WHITE}}>
    <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:50}}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
      <Ionicons name="arrow-back-circle" size={40} color="black" />
      </TouchableOpacity>
      <Text style={{fontSize:27, fontFamily:'outfit-bold'}}>Course Detail</Text>
    </View>

     {/* course intro */}
     <CourseIntro course={course}/>

     {/* source section */}
     <SourceSection 
     userEnrollment={userEnrollment}
     course={course}/>

     {/* Enroll Course */}
    <EnrollmentSection userEnrollment={userEnrollment}
    course={params.course}
    onEnrollmentPress={()=>onEnrollmentPress()}/>

     {/* Lesson Section */}
     {params.course.chapter[0]&&<LessonSection course={course} userEnrollment={userEnrollment}/>}
    </ScrollView>
  )
}