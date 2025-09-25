import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';

import colors from '../constants/color';
import Home from '../screens/app/HomeScreen';
import { ChatFocusedIcon, ChatIcon, HomeFocusedIcon, HomeIcon, UserFocusedIcon, UserIcon, UsersFocusedIcon, UsersIcon } from '../constants/svg';
import LobbyScreen from '../screens/app/LobbyScreen';
import ChatScreen from '../screens/app/ChatScreen';
import ProfileScreen from '../screens/app/ProfileScreen';
import typography from '../constants/typography';
import TextGradient from '../components/ui/TextGradient';

export type BottomTabParamList = {
    Home: undefined;
    Chat: undefined;
    Profile: undefined;
    Lobby: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const tabNames = {
    Home: 'Swipe n pop',
    Lobby: 'Dating Lobby',
    Chat: "Chat",
    Profile: 'Profile'
}

const getTabIcon = (routeName: string, focused: boolean) => {
    switch (routeName) {
        case 'Home':
            return <SvgXml xml={focused ? HomeFocusedIcon : HomeIcon} width={focused? 26 : 22} height={focused ? 26 : 22} />;
        case 'Lobby':
            return <SvgXml xml={focused ? UsersFocusedIcon : UsersIcon} width={26} height={26} />;
        case 'Chat':
            return <SvgXml xml={focused ? ChatFocusedIcon : ChatIcon} width={23} height={23} />;
        case 'Profile':
            return <SvgXml xml={focused ? UserFocusedIcon : UserIcon} width={21} height={21} />;
        default:
            return null;
    }
};

export default function BottomTabsNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: styles.tabBar,
                tabBarIcon: ({ focused }) => getTabIcon(route.name, focused),
                tabBarLabel: ({ focused }) => (
                    focused ? 
                    <TextGradient
                    style={styles.text}
                    locations={[0, 1]}
                    colors={colors.gradientPrimary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    text={tabNames[route.name]}
                />
                    :
                    <Text style={styles.text}>
                      {tabNames[route.name]} 
                    </Text>
                  ),
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Lobby" component={LobbyScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        height: 60,
        backgroundColor: colors.background,
        borderTopWidth: 0.5,
        borderColor: colors.border,
    },
    text: {
        fontSize: typography.xsmall,
        color: colors.textSecondary,
        fontWeight: '500'
    }
});
