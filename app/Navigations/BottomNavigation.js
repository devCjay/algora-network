import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import HomeScreen from "../Screens/Home/Home";

import ReferralScreen from "../Screens/Referral/Referral";

import Raffles from "../Screens/Raffle/Raffles";
import MinerScreen from "../Screens/Miner/Miner";
import OrderScreen from "../Screens/Order/Order";
import LogoutScreen from "../Screens/Auth/LogoutScreen";
import DeleteAccountScreen from "../Screens/Auth/DeleteAccountSCreen";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <>
      
      <Tab.Navigator 
        initialRouteName="Home"
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          //lazy:false,
        }}
      
        
      >

        <Tab.Screen
          name="Logout"
          component={LogoutScreen} 
        />


        <Tab.Screen 
          name="Miner" 
          component={MinerScreen} 
        />


       <Tab.Screen 
          name="Home"
          component={HomeScreen}
        />

        <Tab.Screen
          name="Referral"
          component={ReferralScreen} 
        />

        <Tab.Screen 
          name="Delete Acc"
          component={DeleteAccountScreen}
        />
      

      </Tab.Navigator>
    </>
  );
};



export default BottomNavigation;
