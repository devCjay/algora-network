import React, {useRef, useState, useEffect} from "react";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Platform, StatusBar, View } from "react-native";
import { ActivityIndicator } from "react-native";
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import Onboarding from "../Screens/Onboarding/Onboarding";
import SignIn from "../Screens/Auth/SignIn";
import SignUp from "../Screens/Auth/SignUp";
import DeleteAccountScreen from "../Screens/Auth/DeleteAccountSCreen";

import DepositScreen from "../Screens/Wallet/Deposit";
import WithdrawScreen from "../Screens/Wallet/Withdraw";


import Support from "../Screens/Support/Support";

import DrawerNavigation from "./DrawerNavigation";
import Components from "../Screens/Components/Components";
import AccordionScreen from "../Screens/Components/Accordion";
import ActionSheet from "../Screens/Components/ActionSheet";
import ActionModals from "../Screens/Components/ActionModals";
import Buttons from "../Screens/Components/Buttons";
import Charts from "../Screens/Components/Charts";
import Chips from "../Screens/Components/Chips";
import CollapseElements from "../Screens/Components/CollapseElements";
import DividerElements from "../Screens/Components/DividerElements";
import FileUploads from "../Screens/Components/FileUploads";
import Headers from "../Screens/Components/Headers";
import Footers from "../Screens/Components/Footers";
import TabStyle1 from "../components/Footers/FooterStyle1";
import TabStyle2 from "../components/Footers/FooterStyle2";
import TabStyle3 from "../components/Footers/FooterStyle3";
import TabStyle4 from "../components/Footers/FooterStyle4";
import Inputs from "../Screens/Components/Inputs";
import ListScreen from "../Screens/Components/Lists";
import Paginations from "../Screens/Components/Paginations";
import Pricings from "../Screens/Components/Pricings";

import Snackbars from "../Screens/Components/Snackbars";
import Socials from "../Screens/Components/Socials";
import SwipeableScreen from "../Screens/Components/Swipeable";
import Tabs from "../Screens/Components/Tabs";
import Tables from "../Screens/Components/Tables";
import Toggles from "../Screens/Components/Toggles";
import { useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


import MinerScreen from "../Screens/Miner/Miner";
import OrderScreen from "../Screens/Order/Order";
import CreateOrderScreen from "../Screens/Order/CreateOrder";
import Payment from "../Screens/Payment/Payment";
import ExtendOrderScreen from "../Screens/Order/ExtendOrder";
import ExtendPayment from "../Screens/Payment/ExtendPayment";
import Raffles from "../Screens/Raffle/Raffles";
import TicketDetailScreen from "../Screens/Tickets/TicketDetails";
import WalletScreen from "../Screens/Wallet/Wallet";
import FundAccount from "../Screens/Payment/FundAccount";



const StackComponent = createStackNavigator();

const StackNavigator = () => {

  const theme = useTheme();
  const {colors} = theme;
  const backgroundColor = theme.dark ? colors.background : '#fff';

  const [initialRoute, setInitialRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setInitialRoute(token ? "DrawerNavigation" : "Onboarding");
      } catch (error) {
        console.error("Error checking auth:", error);
        setInitialRoute("Onboarding");
      } finally {
        setIsLoading(false);
      }
    };
    checkLogin();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }



  return (
    <View style={{width:'100%', flex: 1}}>
       {Platform.OS === 'web' || Platform.OS === 'android' &&
        <StatusBar backgroundColor={theme.dark ? colors.background : '#fff'} barStyle={theme.dark ? "light-content" : "dark-content"} />
      }

<StackComponent.Navigator
  initialRouteName={initialRoute}
  screenOptions={{
    headerShown: false,
    animation: "fade",
    cardStyle: {
      backgroundColor: colors.background, // ✅ keep it clean
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  }}
>

         {/* Auth Screens */}
        <StackComponent.Screen name={"Onboarding"} component={Onboarding} />
        <StackComponent.Screen name={"SignIn"} component={SignIn} />
        <StackComponent.Screen name={"SignUp"} component={SignUp} />
        <StackComponent.Screen name={"DeleteAccount"} component={DeleteAccountScreen} />
        

        {/* Protected Screens */}
        <StackComponent.Screen name={"DrawerNavigation"} component={DrawerNavigation} />
       
        <StackComponent.Screen name={"Miner"} component={MinerScreen} />
        <StackComponent.Screen name={"Order"} component={OrderScreen} />
        <StackComponent.Screen name={"CreateOrder"} component={CreateOrderScreen} />
        <StackComponent.Screen name={"ExtendOrder"} component={ExtendOrderScreen} />
        <StackComponent.Screen name={"Payment"} component={Payment} />
        <StackComponent.Screen name={"ExtendPayment"} component={ExtendPayment} />
        <StackComponent.Screen name={"FundAccount"} component={FundAccount} />

        <StackComponent.Screen name={"Raffle"} component={Raffles} />
        <StackComponent.Screen name={"Headers"} component={Headers} />
        <StackComponent.Screen name={"Components"} component={Components} /> 
        <StackComponent.Screen name={"TicketDetails"} component={TicketDetailScreen} />
        <StackComponent.Screen name={"Deposit"} component={DepositScreen} />
        <StackComponent.Screen name={"Wallet"} component={WalletScreen} />

        <StackComponent.Screen name={"Withdraw"} component={WithdrawScreen} />
       
    
        <StackComponent.Screen name={"Support"} component={Support} />
       
        <StackComponent.Screen name={"ActionSheet"} component={ActionSheet} />

        <StackComponent.Screen name={"Accordion"} component={AccordionScreen} />

        <StackComponent.Screen name={"ActionModals"} component={ActionModals} />
        <StackComponent.Screen name={"Buttons"} component={Buttons} />
        <StackComponent.Screen name={"Charts"} component={Charts} />
        <StackComponent.Screen name={"Chips"} component={Chips} />
        <StackComponent.Screen name={"CollapseElements"} component={CollapseElements} />
        <StackComponent.Screen name={"DividerElements"} component={DividerElements} />
        <StackComponent.Screen name={"FileUploads"} component={FileUploads} />
      
        <StackComponent.Screen name={"Footers"} component={Footers} />
        <StackComponent.Screen name={"TabStyle1"} component={TabStyle1} />
        <StackComponent.Screen name={"TabStyle2"} component={TabStyle2} />
        <StackComponent.Screen name={"TabStyle3"} component={TabStyle3} />
        <StackComponent.Screen name={"TabStyle4"} component={TabStyle4} />
        <StackComponent.Screen name={"Inputs"} component={Inputs} />
        <StackComponent.Screen name={"lists"} component={ListScreen} />
        <StackComponent.Screen name={"Paginations"} component={Paginations} />
        <StackComponent.Screen name={"Pricings"} component={Pricings} />
      
        
        <StackComponent.Screen name={"Snackbars"} component={Snackbars} />
        <StackComponent.Screen name={"Socials"} component={Socials} />
        <StackComponent.Screen name={"Swipeable"} component={SwipeableScreen} />
        <StackComponent.Screen name={"Tabs"} component={Tabs} />
        <StackComponent.Screen name={"Tables"} component={Tables} />
        <StackComponent.Screen name={"Toggles"} component={Toggles} />
      </StackComponent.Navigator>
    </View>
  );
};

export default StackNavigator;
