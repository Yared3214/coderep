import { View, Text } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import CourseDetailScreen from '../Screens/CourseDetailScreen';
import TabNavigation from './TabNavigation';
import MembershipModal from '../Screens/MembershipModal';
import { useUser } from '@clerk/clerk-expo';
import GlobalApi from '../Utils/GlobalApi';
export const MembershipContext = createContext();

const Stack = createStackNavigator();

export default function HomeNavigation() {
  const [isMember, setIsMember] = useState();
  const {user} = useUser();
  useEffect(()=>{
    checkUserMembership();
  },[])
  const checkUserMembership = () => {
    GlobalApi.checkMembership(user.emailAddresses).then(resp=>{
      setIsMember(resp.memberships?.length>0)
    })
   }
  return (
    <MembershipContext.Provider value={{isMember, setIsMember}}>
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='home' component={TabNavigation}/>
        <Stack.Screen name='course-detail' component={CourseDetailScreen}/>
        <Stack.Screen name='membership' component={MembershipModal}
        options={{
          presentation:'modal'
        }}/>
    </Stack.Navigator>
    </MembershipContext.Provider>
  )
}