import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import spacing from '../../constants/spacing'
import typography from '../../constants/typography'
import Input from '../../components/ui/Input'
import colors from '../../constants/color'
import GradientDropdown from '../../components/ui/Dropdown'
import Button from '../../components/ui/Button'
import { useNavigation } from '@react-navigation/native'

export default function UserDetails() {
    const navigation = useNavigation()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<string | number | null>(null)
    const [items, setItems] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
    ])

    const handleContinue = () => {
        navigation.navigate('Verification')
    }

    const handleSignin = () => {
        navigation.navigate('Signin')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Let's get to know you</Text>

            <Input label='First Name' value='' onChangeText={() => { }} />
            <Input label='Last Name' value='' onChangeText={() => { }} />
            <Input label='Age' value='' onChangeText={() => { }} />
            <Input label='Location' value='' onChangeText={() => { }} />
            <GradientDropdown
                label="Gender"
                open={open}
                value={value}
                onChangeValue={val => setValue(val)}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
            />

            <View style={styles.locationContainer}>
                <Text style={styles.text}>Use my current location</Text>
                <Switch 
                trackColor={{false: '#F0F2F5', true: '#F0F2F5'}}
                thumbColor='#fff'
                />
            </View>

            <Button variant='gradient' text='Continue' onPress={handleContinue} />

            <View style={styles.bottomContainer}>
                <Text style={styles.text}>Already have an account?</Text>
                <TouchableOpacity onPress={handleSignin}>
                    <Text style={[styles.text, {textDecorationLine: 'underline'}]}>Sign In</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.screenPadding,
        backgroundColor: colors.background,
        paddingTop: spacing.xxl
    },
    heading: {
        fontSize: typography.title,
        fontWeight: 700,
        marginBottom: spacing.xl
    },
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: spacing.lg,
        alignItems: 'center'
    },
    text: {
        color: colors.textPrimary 
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginTop: spacing.md
    },
})