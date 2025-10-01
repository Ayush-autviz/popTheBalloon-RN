import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

import spacing from '../../../constants/spacing'
import typography from '../../../constants/typography'
import colors from '../../../constants/color'
import Button from '../../ui/Button'


export default function BallonDatingHeader() {
    const colorCombo = ['#FEFEFE', '#EFEFFF']

  return (
    <LinearGradient colors={colorCombo} style={styles.container}>
          <Image source={require('../../../assets/images/people/person6.png')} style={styles.hostAvatar} resizeMode='cover'/>

<View>
        <Text style={{fontWeight: '500', fontSize: typography.body}}>Sophia</Text>
        <Text style={{color: colors.textSecondary}}>Host • Speaking</Text>
   </View>

   <Button text='Host' style={{width: 80, borderRadius: spacing.large,paddingVertical: spacing.xs,marginTop: 0}} textStyle={{fontSize: typography.body, fontWeight: '400'}}/>
    </LinearGradient>

  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.lg,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E5DBDE'
    },
    hostAvatar: {
        width: 60,
        height: 60,
        borderRadius: spacing.jumbo
      },
})