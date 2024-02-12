import { ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header';
import GlobalApi from '../Utils/GlobalApi';
import CategoryList from '../Components/CategoryList';
import SectionHeading from '../Components/SectionHeading';
import CourseList from '../Components/CourseList';

export default function HomeScreen() {
  const [categories, setCategories] = useState();
  const [courseList, setCourseList] = useState();
  const [orgCourseList, setOrgCourseList] = useState([]);
  useEffect(()=>{
    getCategory();
    getCourseList();
  },[])
  const getCategory = () => {
    GlobalApi.getCategory().then(resp=>{
      setCategories(resp.categories)
    })
  }
  const getCourseList = () => {
    GlobalApi.getCourseList().then(resp=>{
       setCourseList(resp.courseLists)
       setOrgCourseList(resp.courseLists)
    })
  }
   const getFilterCourseList = (tag) => {
     const result = courseList?.filter((item)=>item.tag.includes(tag));
     return result;
   }
   const filterCourseList = (category) => {
    const result = orgCourseList?.filter((item)=>item.tag.includes(category));
    setCourseList(result)
   }
  return (
    
    <ScrollView style={{padding:20, marginTop:30}}>
        <Header/>
        {/* CategoryList */}
        <CategoryList categories={categories}
        setSelectedCategory={(category)=>filterCourseList(category)}/>
         {/* course list */}
         <SectionHeading heading={'Latest Courses'}/>
         <CourseList courseList={courseList}/>
         {/* react course list */}
          <SectionHeading heading={'React.js Courses'}/>
         <CourseList courseList={getFilterCourseList('reactjs')}/>
         {/* nextjs course list */}
          <SectionHeading heading={'Nextjs Courses'}/>
         <CourseList courseList={getFilterCourseList('nextjs')}/>
    </ScrollView>
  )
}