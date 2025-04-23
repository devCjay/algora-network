import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavigation from './BottomNavigation';
import Sidebar from '../layout/Sidebar';
import { SafeAreaView } from 'react-native';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <SafeAreaView
            style={{
                flex:1,
            }}
        >
            <Drawer.Navigator
                drawerContent={() => <Sidebar/>}
                screenOptions={{
                    headerShown : false
                }}
            >
                <Drawer.Screen
                    name="BottomNavigation"
                    component={BottomNavigation} 
                />
            </Drawer.Navigator>
        </SafeAreaView>
    );
};

export default DrawerNavigation;