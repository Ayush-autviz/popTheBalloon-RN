import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'


export default function SplashScreen(): React.ReactElement {
  return (
    <View>
     <Image source={require('../../assets/images/SplashImage.png')} style={styles.image} resizeMode='cover'/>
    </View>
  )
}

const styles  = StyleSheet.create({
    image: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    }
})