import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreateDatingLobby from '../screens/app/CreateDatingLobby'
import LobbyDetails from '../screens/app/LobbyDetails'


export default function AppNavigator() {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='CreateLobby' component={CreateDatingLobby} />
            <Stack.Screen name='LobbyDetails' component={LobbyDetails} />
        </Stack.Navigator>
    )
}