import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import HomeScreen from "../Screens/Home/Home";

import ReferralScreen from "../Screens/Referral/Referral";

import Raffles from "../Screens/Raffle/Raffles";
import MinerScreen from "../Screens/Miner/Miner";
import OrderScreen from "../Screens/Order/Order";
import LogoutScreen from "../Screens/Auth/LogoutScreen";

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
          name="Miner" 
          component={MinerScreen} 
        />


        <Tab.Screen 
          name="Orders"
          component={OrderScreen}
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
          name="Logout"
          component={LogoutScreen} 
        />

      

      </Tab.Navigator>
    </>
  );
};



export default BottomNavigation;
