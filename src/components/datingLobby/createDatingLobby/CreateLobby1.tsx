import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GradientInput from '../../ui/Input'
import TextArea from '../../ui/TextArea'

export default function CreateLobby1() {
  return (
    <View>
      <GradientInput label='Lobby Name' value='' onChangeText={() => {}} />
      <TextArea variant='gradient' label='Add Description' value='' onChangeText={() => {}} />
    </View>
  )
}

const styles = StyleSheet.create({})