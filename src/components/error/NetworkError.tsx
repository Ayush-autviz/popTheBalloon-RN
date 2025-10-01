import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import spacing from '../../constants/spacing'
import Button from '../ui/Button'
import typography from '../../constants/typography'

export default function NetworkError() {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/error/error.png')} resizeMode='contain' style={styles.image} />
            <Text style={styles.heading}>Network Error</Text>
            <Text style={styles.description}>Oops! It seems like there's a problem with your internet connection. Please check your network settings and try again.</Text>
            <Button variant='grey' text='Retry' style={styles.button} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: 300
    },
    heading: {
        marginTop: spacing.xlarge,
        fontWeight: '700',
        fontSize: typography.subtitle
    },
    description: {
        fontSize: typography.body,
        textAlign: 'center',
        marginTop: spacing.md
    },
    button: {
        paddingHorizontal: spacing.xxxl,
        marginTop: spacing.xl
    }
})