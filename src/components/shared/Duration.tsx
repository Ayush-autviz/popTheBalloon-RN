import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../ui/Button'
import spacing from '../../constants/spacing'

export default function Duration() {
  return (
    <View style={styles.main}>
      <View style={styles.row}>
        <Button variant='outline'  text='-' style={{width: '20%'}}/>
        <Button variant='outline'  text='05' style={{width: '20%'}} />
        <Button text='+' style={{width: '20%', marginTop: 10, marginBottom: 10 }} />
      </View>
      <Button text='Add' variant='outline' style={{width: '25%'}} />
    </View>
  )
}

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: "row",
        gap: 10
    }
})