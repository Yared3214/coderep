import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../Screens/HomeScreen';
import MyCourseScreen from '../Screens/MyCourseScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import Colors from '../Utils/Colors';
import HomeNavigation from './HomeNavigation';

const Tab = createBottomTabNavigator();


export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false, tabBarActiveTintColor:Colors.PRIMARY}}>
        <Tab.Screen options={{
            tabBarIcon: ({color, size}) => (
                <Ionicons name="home" size={24} color={color} />
            ),
            tabBarLabel: ({color}) => (
                <Text style={{color:color}}>Home</Text>
            )
        }} name='Home' component={HomeScreen}/>
        <Tab.Screen options={{
            tabBarIcon: ({color, size}) => (
                <Ionicons name="book" size={24} color={color} />
            ),
            tabBarLabel: ({color}) => (
                <Text style={{color:color}}>MyCourse</Text>
            )
        }} name='MyCourse' component={MyCourseScreen}/>
        <Tab.Screen options={{
            tabBarIcon: ({color, size}) => (
                <Ionicons name="person-circle" size={24} color={color} />
            ),
            tabBarLabel: ({color}) => (
                <Text style={{color:color}}>Profile</Text>
            )
        }} name='Profile' component={ProfileScreen}/>
    </Tab.Navigator>
  )
}