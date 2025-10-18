import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { z } from 'zod'

import spacing from '../../constants/spacing'
import typography from '../../constants/typography'
import GradientInput from '../../components/ui/Input'
import colors from '../../constants/color'
import GradientDropdown from '../../components/ui/Dropdown'
import Button from '../../components/ui/Button'
import { useNavigation } from '@react-navigation/native'
import GradientSwitch from '../../components/ui/GradientSwitch'
import { SafeAreaView } from 'react-native-safe-area-context'
import { handleLocationPermission, getLocationWithErrorHandling, PermissionError } from '../../utils/geolocation'
import PermissionModal from '../../components/ui/PermissionModal'
import { useUpdatePersonalInfo } from '../../hooks/useAuth'
import { useAuthStore } from '../../store/authStore'
import { useToast } from '../../hooks/useToast'

type FormData = {
    firstName: string
    lastName: string
    age: string
    location: string
    gender: string
}

export default function UserDetails(): React.ReactElement {
    const navigation = useNavigation<any>()
    const { mutate: updatePersonalInfo, isPending } = useUpdatePersonalInfo()
    const { setUserPref } = useAuthStore()
    const toast = useToast()
    
    const [form, setForm] = useState<FormData>({
        firstName: '',
        lastName: '',
        age: '',
        location: '',
        gender: ''
    })
    
    const [genderItems] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
    ])
    const [useCurrentLocation, setUseCurrentLocation] = useState(false)
    const [currentCoordinates, setCurrentCoordinates] = useState<{latitude: number, longitude: number} | null>(null)
    const [permissionModal, setPermissionModal] = useState<{
        visible: boolean
        title: string
        message: string
        onConfirm?: () => void
    }>({
        visible: false,
        title: '',
        message: '',
    })
    
    const schema = z.object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        age: z.string().min(1, 'Age is required').refine((val) => {
            const age = parseInt(val)
            return age >= 18 && age <= 100
        }, 'Age must be between 18 and 100'),
        location: z.string().min(1, 'Location is required'),
        gender: z.string().min(1, 'Gender is required')
    })

    const handleContinue = () => {
        const parsed = schema.safeParse(form)
        if (!parsed.success) {
            const first = parsed.error.issues[0]
            toast.error('Validation Error', first.message)
            return
        }
        
        const payload = {
            firstName: parsed.data.firstName,
            lastName: parsed.data.lastName,
            age: parseInt(parsed.data.age),
            gender: parsed.data.gender,
            location: {
                address: "123 Main St",
                coordinates: { latitude: 0, longitude: 0 },
                city: "New York",
                state: 'US',
                country: 'United States'
            }
        }
        
        updatePersonalInfo(payload, {
            onSuccess: (res) => {
                console.log('[UserDetails] Personal info updated', res)
                // Update user preferences with new registration step
                if (res.registrationStep) {
                    const currentUserPref = useAuthStore.getState().userPref
                    if (currentUserPref) {
                        setUserPref({ ...currentUserPref, registrationStep: res.registrationStep })
                    }
                }
                toast.success('Success', 'Personal information updated successfully!')
                navigation.navigate('AddPhotos')
            },
            onError: (err) => {
                console.log('[UserDetails] Update failed', err)
                toast.error('Error', 'Failed to update personal information. Please try again.')
            }
        })
    }

    const handleSignin = () => {
        navigation.navigate('Signin')
    }

    // const showPermissionModal = (error: PermissionError) => {
    //     let title = 'Location Permission Required'
    //     let message = 'This app needs access to your location to provide location-based features.'

    //     switch (error.type) {
    //         case 'never_ask_again':
    //             title = 'Location Permission Permanently Denied'
    //             message = 'Location permission was permanently denied. Please go to Settings > Apps > PopTheBalloon > Permissions and enable Location access manually.'
    //             break
    //         case 'permission_denied':
    //             title = 'Location Permission Denied'
    //             message = 'Location permission is required to use this feature. Please try again and allow location access.'
    //             break
    //         case 'service_disabled':
    //             title = 'Location Service Disabled'
    //             message = 'Location services are disabled on your device. Please enable location services in your device settings.'
    //             break
    //         case 'timeout':
    //             title = 'Location Timeout'
    //             message = 'Location request timed out. Please try again or check your location settings.'
    //             break
    //         case 'unavailable':
    //             title = 'Location Unavailable'
    //             message = 'Location is currently unavailable. Please check your location settings and try again.'
    //             break
    //         default:
    //             title = 'Location Error'
    //             message = error.message || 'An error occurred while accessing your location.'
    //     }

    //     setPermissionModal({
    //         visible: true,
    //         title,
    //         message,
    //         onConfirm: () => {
    //             console.log('User should open settings manually')
    //             // You can add Linking.openSettings() here if needed
    //         }
    //     })
    // }

    const handleLocationToggle = async (isEnabled: boolean) => {
        if (isEnabled) {
            // First check and handle permissions
            const permissionResult = await handleLocationPermission()
            if (!permissionResult.hasPermission) {
                console.log('Location permission denied:', permissionResult.error)
                if (permissionResult.error) {
                    // showPermissionModal(permissionResult.error)
                }
                return // Don't enable the switch
            }

            // Permission granted, now get location
            const locationResult = await getLocationWithErrorHandling()
            if (locationResult.success && locationResult.coordinates) {
                console.log('Current coordinates:', locationResult.coordinates)
                setCurrentCoordinates(locationResult.coordinates)
                setUseCurrentLocation(true)
                // Update location field with current location
                setForm(prev => ({ ...prev, location: 'Current Location' }))
            } else {
                // Location service might be disabled or other error
                console.error('Location error:', locationResult.error)
                if (locationResult.error) {
                    // showPermissionModal(locationResult.error)
                }
            }
        } else {
            // User is turning off location
            setUseCurrentLocation(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Let's get to know you</Text>

            <GradientInput 
                label='First Name' 
                value={form.firstName} 
                onChangeText={(v) => setForm(prev => ({ ...prev, firstName: v }))} 
            />
            <GradientInput 
                label='Last Name' 
                value={form.lastName} 
                onChangeText={(v) => setForm(prev => ({ ...prev, lastName: v }))} 
            />
            <GradientInput 
                label='Age' 
                value={form.age} 
                onChangeText={(v) => setForm(prev => ({ ...prev, age: v }))} 
                keyboardType='numeric'
            />
            <GradientInput 
                label='Location' 
                value={form.location} 
                onChangeText={(v) => setForm(prev => ({ ...prev, location: v }))} 
            />
            <GradientDropdown
                label="Gender"
                value={form.gender}
                onChangeValue={(val) => setForm(prev => ({ ...prev, gender: val as string }))}
                items={genderItems}
                placeholder="Select your gender"
            />

            <View style={styles.locationContainer}>
                <Text style={styles.text}>Use my current location</Text>
                <GradientSwitch 
                    value={useCurrentLocation} 
                    onValueChange={handleLocationToggle} 
                />
            </View>

            <Button 
                variant='gradient' 
                text='Continue' 
                onPress={handleContinue} 
                loading={isPending}
                disabled={isPending}
            />

            {/* <View style={styles.bottomContainer}>
                <Text style={styles.text}>Already have an account?</Text>
                <TouchableOpacity onPress={handleSignin}>
                    <Text style={[styles.text, {textDecorationLine: 'underline'}]}>Sign In</Text>
                </TouchableOpacity>
            </View> */}

            <PermissionModal
                visible={permissionModal.visible}
                title={permissionModal.title}
                message={permissionModal.message}
                onClose={() => setPermissionModal(prev => ({ ...prev, visible: false }))}
                onConfirm={permissionModal.onConfirm}
                confirmText="Open Settings"
                cancelText="Cancel"
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.screenPadding,
        backgroundColor: colors.background,
        paddingTop: spacing.xxxl
    },
    heading: {
        fontSize: typography.title,
        fontWeight: 700,
        marginBottom: spacing.xxxl
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