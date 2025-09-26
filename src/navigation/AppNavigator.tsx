import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreateDatingLobby from '../screens/app/CreateDatingLobby'


export default function AppNavigator() {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='CreateDatingLobby' component={CreateDatingLobby} />
        </Stack.Navigator>
    )
}