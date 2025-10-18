import React from 'react'
import OnboardingNavigator from './OnboardingNavigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from '../screens/splash/SplashScreen'
import AuthNavigator from './AuthNavigator'
import BottomTabsNavigator from './BottomTabsNavigator'
import AppNavigator from './AppNavigator'



export default function RootNavigator() {

    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, }} >
                <Stack.Screen name='SplashScreen' component={SplashScreen} />
                <Stack.Screen name='Onboarding' component={OnboardingNavigator} />
                <Stack.Screen name='Auth' component={AuthNavigator} />
                <Stack.Screen name='Tabs' component={BottomTabsNavigator} />
                <Stack.Screen name='App' component={AppNavigator} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}