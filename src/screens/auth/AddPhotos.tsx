import { Alert, ActionSheetIOS, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import spacing from '../../constants/spacing'
import colors from '../../constants/color'
import typography from '../../constants/typography'
import Button from '../../components/ui/Button'
import ImagePicker from '../../components/ui/ImagePicker'
import { captureFromCamera, pickFromGallery, PickedImage } from '../../utils/mediaPicker'
import { useNavigation } from '@react-navigation/native'

export default function AddPhotos(): React.ReactElement {
    const navigation = useNavigation<any>()
    const cameraIcon = require('../../assets/icons/camera.png')
    const picturesIcon = require('../../assets/icons/pictures.png')
    const [images, setImages] = useState<PickedImage[]>([])
    const [selectedSource, setSelectedSource] = useState<'camera' | 'gallery'>('gallery')
    const [nextIndex, setNextIndex] = useState(0)

    const setAt = (index: number, img: PickedImage) => {
        setImages(prev => {
            const next = [...prev]
            next[index] = img
            return next
        })
        setNextIndex(Math.min(index + 1, 2)) // Move to next slot, max 3 images
    }

    const choose = async (index: number, source: 'camera' | 'gallery') => {
        const picked = source === 'camera' ? await captureFromCamera() : await pickFromGallery()
        if (picked?.uri) setAt(index, picked)
    }

    const handleBoxPress = (index: number) => {
        // Only allow selecting the next available slot
        if (index !== nextIndex) return
        choose(index, selectedSource)
    }

    const handleContinue = () => {
        navigation.navigate('AboutYourself')
    }

    return (
        <SafeAreaView style={styles.main}>
            <Header text='Add Photos' />

            <View style={styles.container}>
                <Text style={styles.text}>Add at least 3 photos to show your best self</Text>

                <ImagePicker images={images} onPress={handleBoxPress} />

                <View style={styles.buttonsContainer} >
                    <Button variant='outline' gradientText text='Camera' image={cameraIcon} style={[{width: '48%'}, selectedSource === 'camera' ? {padding: 2.5} : {}]} onPress={() => setSelectedSource('camera')} />
                    <Button variant='outline' gradientText text='Gallery' image={picturesIcon} style={[{width: '48%'}, selectedSource === 'gallery' ? {padding: 2.5} : {}]} onPress={() => setSelectedSource('gallery')} />
                </View>

            </View>

            <View style={styles.footer}> 
                
            <Button onPress={handleContinue} variant='grey' text='Continue' />
            <Button variant='ghost' text='Skip for now' />

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex:1,
        backgroundColor: colors.background
    },
    container: {
        padding: spacing.screenPadding,
        flex: 1
    },
    text: {
        color: colors.textPrimary,
        fontSize: typography.body,
        textAlign: 'center'
    },
    buttonsContainer:{
        flexDirection:'row',
        gap: '4%',
    },
    footer: {
            padding: spacing.screenPadding,
    }
})