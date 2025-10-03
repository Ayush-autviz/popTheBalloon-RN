import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Verification from '../screens/auth/Verification'
import UserDetails from '../screens/auth/UserDetails'
import Signup from '../screens/auth/Signup'
import AddPhotos from '../screens/auth/AddPhotos'
import AboutYourself from '../screens/auth/AboutYourself'
import Partners from '../screens/auth/Partners'
import Signin from '../screens/auth/Signin'


export default function AuthNavigator() {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen name='Verification' component={Verification} />
            <Stack.Screen name='UserDetails' component={UserDetails} />
            <Stack.Screen name='AddPhotos' component={AddPhotos} />
            <Stack.Screen name='AboutYourself' component={AboutYourself} />
            <Stack.Screen name='Partners' component={Partners} />
            <Stack.Screen name='Signin' component={Signin} />
        </Stack.Navigator>
    )
}