import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from './../Utils/Colors'
import SectionHeading from './SectionHeading';

export default function CategoryList({categories, setSelectedCategory}) {
    const [activeIndex, setActiveIndex] = useState();
  return (
    <View>
        <SectionHeading heading={'Category'}/>
      <FlatList data={categories}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index})=>(
        <TouchableOpacity
        onPress={()=>{setActiveIndex(index)
        setSelectedCategory(item.slug)}}
        style={[styles.container,activeIndex==index&&{borderWidth:1,borderColor:Colors.PRIMARY}]}>
            <Image source={{uri:item?.icon?.url}}
            style={{width:40, height:40, objectFit:'contain'}}/>
            <Text style={{marginTop:4}}>{item?.name}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.WHITE,
        padding:15,
        marginRight:10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
        width:90
    }
})