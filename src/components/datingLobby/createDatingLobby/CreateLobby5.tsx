import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Recording from '../../shared/Recording'
import QuestionCards from '../../shared/QuestionCards'
import { genericQuestions } from '../../../constants/questions'
import typography from '../../../constants/typography'
import Duration from '../../shared/Duration'

export default function CreateLobby5() {
  return (
    <View>
      <Recording />
      <Text style={styles.heading}>Genric Questions</Text>
      <QuestionCards questions={genericQuestions} />
      <Duration />
    </View>
  )
}

const styles = StyleSheet.create({
    heading: {
        fontWeight: '700',
        fontSize: typography.subtitle
    }
})