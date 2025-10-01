import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreateDatingLobby from '../screens/app/CreateDatingLobby'
import LobbyDetails from '../screens/app/LobbyDetails'
import BallonDatingLobby from '../screens/app/BallonDatingLobby'
import MessageScreen from '../screens/app/chat/MessageScreen'


export default function AppNavigator() {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='CreateLobby' component={CreateDatingLobby} />
            <Stack.Screen name='LobbyDetails' component={LobbyDetails} />
            <Stack.Screen name='BallonDatingLobby' component={BallonDatingLobby} />
            <Stack.Screen name='MessageScreen' component={MessageScreen} />
        </Stack.Navigator>
    )
}