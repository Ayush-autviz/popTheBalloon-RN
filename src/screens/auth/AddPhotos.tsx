import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import spacing from '../../constants/spacing'
import colors from '../../constants/color'
import typography from '../../constants/typography'
import Button from '../../components/ui/Button'
import ImagePicker from '../../components/ui/ImagePicker'
import { useNavigation } from '@react-navigation/native'

export default function AddPhotos(): React.ReactElement {
    const navigation = useNavigation<any>()
    const cameraIcon = require('../../assets/icons/camera.png')
    const picturesIcon = require('../../assets/icons/pictures.png')

    const handleContinue = () => {
        navigation.navigate('AboutYourself')
    }

    return (
        <SafeAreaView style={styles.main}>
            <Header text='Add Photos' />

            <View style={styles.container}>
                <Text style={styles.text}>Add at least 3 photos to show your best self</Text>

                <ImagePicker images={[]} onPress={() => {}} />

                <View style={styles.buttonsContainer} >
                    <Button variant='outline' gradientText text='Camera' image={cameraIcon} style={{width: '48%'}}/>
                    <Button variant='outline' gradientText text='Gallery' image={picturesIcon} style={{width: '48%'}} />
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