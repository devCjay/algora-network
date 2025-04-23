import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, RefreshControl } from 'react-native';
import { GlobalStyleSheet } from '../../Utils/styleSheet';
import { COLORS, FONTS, IMAGES } from '../../Utils/theme';

import Header from '../../layout/header';
import PricingStyle1 from '../../components/Pricing/PricingStyle1';
import PricingStyle2 from '../../components/Pricing/PricingStyle2';
import PricingStyle3 from '../../components/Pricing/PricingStyle3';
import { useTheme } from '@react-navigation/native';
import Tickets from '../Tickets/Tickets';


const Raffles = () => {

  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

  const onRefresh = async () => {
    setRefreshing(true); // Start refreshing animation

    try {
      // Example: Fetch updated data or reset state
      console.log("Refreshing data...");
      await fetchData(); // Replace with your data-fetching logic
    } catch (error) {
      console.error("Error refreshing data:", error);
    }

    setRefreshing(false); // Stop refreshing animation
  };

  const fetchData = async () => {
    // Example: Fetch data or perform any updates
    console.log("Fetching updated data...");
  };


  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgColor }}>
        <Header title={'Raffles'} titleLeft leftIcon={'back'} />
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]} // Customize spinner color
            />
          }
        >
          <View style={{ ...GlobalStyleSheet.container, alignItems: 'center', paddingVertical: 30 }}>

            <View style={{ alignItems: 'center', marginBottom: 25 }}>

              <Text style={{ ...FONTS.h4, color: colors.title, marginBottom: 5 }}>Raffles</Text>

              <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 5 }}>

                <Text style={{ ...FONTS.font, ...FONTS.fontBold, fontSize: 16, color: colors.title, marginBottom: 5, marginLeft: 3 }}>Join exciting raffles and win big prizes!</Text>
              </View>

            </View>



            <Tickets />


          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};



const styles = StyleSheet.create({

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    opacity: 0.7,
  },
  loadingButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },

})


export default Raffles;