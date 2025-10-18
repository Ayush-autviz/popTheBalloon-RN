import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import spacing from '../../constants/spacing'
import colors from '../../constants/color'
import typography from '../../constants/typography'
import TextArea from '../../components/ui/TextArea'
import GradientProgressBar from '../../components/ui/ProgressBar'
import Button from '../../components/ui/Button'
import { ChevronRight } from 'lucide-react-native'
import VoiceRecorder from '../../components/shared/VoiceRecorder'
import { useUpdateBioAndVoice } from '../../hooks/useAuth'
import { useAuthStore } from '../../store/authStore'
import { useNavigation } from '@react-navigation/native'
import { useToast } from '../../hooks/useToast'

export default function AboutYourself(): React.ReactElement {
    const navigation = useNavigation<any>()
    const { mutate: updateBioAndVoice, isPending } = useUpdateBioAndVoice()
    const { setUserPref } = useAuthStore()
    const toast = useToast()
    
    const [bio, setBio] = useState('')
    const [voiceRecordingPath, setVoiceRecordingPath] = useState<string | null>(null)
    
    const handleContinue = async () => {
        if (!bio.trim()) {
            toast.error('Bio Required', 'Please write a bio about yourself.')
            return
        }

        if (bio.trim().length < 10) {
            toast.error('Bio Too Short', 'Bio must be at least 10 characters long.')
            return
        }

        // Prepare form data for multipart upload
        const formData = new FormData()
        formData.append('bio', bio.trim())

        // Add voice recording if available
        if (voiceRecordingPath) {
            const voiceFile = {
                uri: voiceRecordingPath,
                type: 'audio/mpeg', // or appropriate MIME type
                name: 'voice_recording.mp3'
            } as any
            formData.append('voice', voiceFile)
        }

        updateBioAndVoice(formData as any, {
            onSuccess: (res) => {
                console.log('[AboutYourself] Bio and voice updated', res)
                if (res.data?.registrationStep) {
                    const currentUserPref = useAuthStore.getState().userPref
                    if (currentUserPref) {
                        setUserPref({ ...currentUserPref, registrationStep: res.data.registrationStep })
                    }
                }

                if (res.data?.registrationCompleted) {
                    toast.success('Success', 'Registration completed successfully!')
                    // Navigate to main app (BottomTabsNavigator)
                    navigation.navigate('App')
                } else {
                    toast.success('Success', 'Profile updated successfully!')
                    navigation.navigate('App')
                }
            },
            onError: (err) => {
                console.log('[AboutYourself] Update failed', err)
                toast.error('Error', 'Failed to update profile. Please try again.')
            }
        })
    }
    
    const handleSkip = () => {
        navigation.navigate('App')
    }
    
    return (
        <SafeAreaView style={styles.main}>
            <Header text='About Yourself' />
            <ScrollView style={styles.container}>

                <Text style={styles.heading}>Tell us about yourself</Text>

                <Text style={styles.text}>Add Bio</Text>

                <TextArea 
                    placeholder='Write a bio about yourself.' 
                    value={bio} 
                    onChangeText={setBio} 
                />

                <Text style={styles.text}>Voice Prompt</Text>

                {/* <View style={styles.subContainer}>
                    <Text>Audio Quality</Text>
                    <Text>Good</Text>
                </View>

                <View style={styles.subContainer}>
                    <Text>Recording Tips</Text>
                    <ChevronRight size={typography.secondaryTitle}/>
                </View> */}

                <VoiceRecorder
                    maxDuration={60}
                    onRecordingComplete={(filePath) => {
                        // Handle the recorded file path
                        console.log('Recording saved:', filePath)
                        setVoiceRecordingPath(filePath)
                    }}
                />

                {/* <Text style={styles.recordText}>Record a voice prompt</Text> */}

            </ScrollView>

            <View style={styles.footer}>
                <Button 
                    variant='gradient' 
                    text='Continue' 
                    onPress={handleContinue}
                    loading={isPending}
                    disabled={isPending}
                />
                {/* <Button 
                    variant='ghost' 
                    text='Skip for now' 
                    onPress={handleSkip}
                /> */}
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