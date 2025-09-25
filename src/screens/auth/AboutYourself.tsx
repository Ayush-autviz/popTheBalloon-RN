import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import spacing from '../../constants/spacing'
import colors from '../../constants/color'
import typography from '../../constants/typography'
import TextArea from '../../components/ui/TextArea'
import GradientProgressBar from '../../components/ui/ProgressBar'
import Button from '../../components/ui/Button'
import { ChevronRight } from 'lucide-react-native'

export default function AboutYourself() {
    return (
        <SafeAreaView style={styles.main}>
            <Header text='About Yourself' />
            <ScrollView style={styles.container}>

                <Text style={styles.heading}>Tell us about yourself</Text>

                <Text style={styles.text}>Add Bio</Text>

                <TextArea placeholder='Write a bio about yourself.' value='' onChangeText={() => { }} />

                <Text style={styles.text}>Voice Prompt</Text>

                <View style={styles.subContainer}>
                    <Text>Audio Quality</Text>
                    <Text>Good</Text>
                </View>

                <View style={styles.subContainer}>
                    <Text>Recording Tips</Text>
                    <ChevronRight size={typography.secondaryTitle}/>
                </View>

                <Text style={styles.minutes}>0:30/1:00</Text>
                <GradientProgressBar progress={0.5} />

                <Text style={styles.recordText}>Record a voice prompt</Text>

                <Button variant='gradient' text='Record' style={styles.recordButton}/>

            </ScrollView>

            <View style={styles.footer}>
                <Button variant='gradient' text='Continue' />
                <Button variant='ghost' text='Skip for now' />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor: colors.background
    },
    container: {
        flex: 1,
        padding: spacing.screenPadding,
        backgroundColor: colors.background
    },
    heading: {
        fontSize: typography.title,
        fontWeight: '700',
        textAlign: 'center'
    },
    text: {
        fontWeight: '600',
        fontSize: typography.subtitle,
        marginTop: spacing.lg
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: spacing.lg
    },
    minutes: {
        fontWeight: '500',
        marginTop: spacing.xxl
    },
    recordText: {
        textAlign: 'center',
        marginTop: spacing.md
    },
    recordButton: {
        marginHorizontal: 'auto',
        paddingHorizontal: spacing.xxl,
        borderRadius: spacing.xxl
    },
    footer: {
        padding: spacing.screenPadding,
}
})