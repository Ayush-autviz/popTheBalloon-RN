import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import spacing from '../../constants/spacing'
import colors from '../../constants/color'

const imageOverlay = ({item}: any) => {
  return (
    <ImageBackground
    source={item.imageSource}
    style={styles.background}
    resizeMode="cover"
  >

    <View style={styles.content}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>
       {item.description}
      </Text>
    </View>
  </ImageBackground>
  )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
      },
      content: {
        paddingHorizontal: spacing.md,
        backgroundColor: 'transparent',
      },
      title: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.textPrimary,
        textAlign: 'center',
      },
      subtitle: {
        fontSize: 14,
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: spacing.xs,
        marginHorizontal: spacing.md
      },
})

export default imageOverlay