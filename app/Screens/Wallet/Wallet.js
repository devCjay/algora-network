import React, {useState,useRef} from "react";
import { 
  ImageBackground, 
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  Platform,
} from "react-native";
import { useTheme } from '@react-navigation/native';
import Header from "../../layout/header";
import { COLORS, FONTS, IMAGES, SIZES } from "../../Utils/theme";
import { useNavigation } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { LinearGradient } from 'expo-linear-gradient';
import { Checkbox } from 'react-native-paper';
import { VictoryPie } from "victory-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Ripple from "react-native-material-ripple";
import TransferSheet from "../../components/BottomSheet/TransferSheet";
import DepositSheet from "../../components/BottomSheet/DepositSheet";
import WithdrawSheet from "../../components/BottomSheet/WithdrawSheet";
import WalletConvert from "../../components/BottomSheet/WalletConvert";
import { GlobalStyleSheet } from "../../Utils/styleSheet";


const { width } = Dimensions.get('window');


const ListData = [
  {
    id : "1",
    icon : IMAGES.bitcoin,
    coin : "Bitcoin",
    amount : "0.154836",
    rate : "+4.6%",
    subTitle : 'BTC  $8,456.87',
  },
  {
    id : "2",
    icon : IMAGES.etherium,
    coin : "Etherium",
    amount : "0.154836",
    rate : "+4.6%",
    subTitle : 'BTC  $8,456.87',
  },
  {
    id : "3",
    icon : IMAGES.litherium,
    coin : "LTC",
    amount : "0.154836",
    rate : "+4.6%",
    subTitle : 'BTC  $8,456.87',
  },
  {
    id : "4",
    icon : IMAGES.bitcoin,
    coin : "Bitcoin",
    amount : "0.154836",
    rate : "+4.6%",
    subTitle : 'BTC  $8,456.87',
  },
]



const WalletScreen = () => {
 
  const { colors } = useTheme();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const refRBSheet = useRef();
  const [walletRBSheet, setWalletRBSheet] = useState('transfer');

  return (
    <>
      <SafeAreaView style={{padding:0, flex:1}}>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          height={walletRBSheet === 'transfer' ? 555 :
                  walletRBSheet === 'deposit' ? 220 :
                  walletRBSheet === 'withdraw' ? 480 :
                  walletRBSheet === 'convert' ? 580 : 400
              }
          openDuration={300}
          customStyles={{
              wrapper: {
                backgroundColor: 'rgba(0,0,0,.6)',
              },
              container:{
                  backgroundColor: colors.bgLight,
                  paddingTop:15
              },
              draggableIcon: {
                  width:85,
                  height:6,
                  backgroundColor:colors.text,
                  opacity:.3,
              }
          }}
        >
          {
            (walletRBSheet === 'transfer') ? <TransferSheet/> :
            (walletRBSheet === 'deposit') ? <DepositSheet /> :
            (walletRBSheet === 'withdraw') ? <WithdrawSheet /> :
            (walletRBSheet === 'convert') ? <WalletConvert /> : <></>
          }
          
        </RBSheet>
        <ScrollView
          contentContainerStyle={{paddingBottom:80,flexGrow:1}}
          showsHorizontalScrollIndicator={false}
        >
          <View style={[GlobalStyleSheet.container,{paddingHorizontal:-15,paddingTop:0}]}>
          <Header transparent title="Wallet"/>
            <ImageBackground
              source={IMAGES.pattern}
              style={[{
                padding:0,
                alignItems:'center',
                justifyContent:'center',
                width:'100%',
                paddingBottom:45,
              }]}
            > 

              <View
                style={{
                  top:4,
                  position:'absolute',
                }}
              >
                <VictoryPie
                  width={500}
                  height={394}
                  cornerRadius={10}
                  innerRadius={137}
                  startAngle={90}
                  endAngle={-90}
                  padAngle={3}
                  labels={({ datum }) => ``}
                  colorScale={["#BB85FF", "#09B6C1"]}
                  data={[
                    { x: "Profit", y: 55 },
                    { x: "Loss", y: 45 }
                  ]}
                />
              </View>
                
              <View style={{paddingTop:70,alignItems:'center',height:230,justifyContent:'center'}}>
                <Text style={{...FONTS.font,color:COLORS.white,marginBottom:6,opacity:.8}}>Total Amount</Text>
                <Text style={{...FONTS.h2,color:COLORS.white,marginBottom:4}}>$89,120</Text>
                <View
                  style={{
                    flexDirection:'row',
                    alignItems:'center',
                  }}
                >
                  <Image
                    source={IMAGES.trend}
                    style={{
                      height:16,
                      width:16,
                      marginRight:6,
                      tintColor:COLORS.white,
                    }}
                  />
                  <Text style={{...FONTS.font,color:COLORS.white}}>15.20% <Text style={{color:"#00fba6"}}>(+6.75%)</Text></Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View
            style={[GlobalStyleSheet.container,{
              padding:0,
              flexDirection:'row',
              marginHorizontal:10,
              marginTop:-45,
              zIndex:2,
            }]}
          >
            <TouchableOpacity 
              activeOpacity={.95}
              style={[{
                backgroundColor:colors.bgLight,
                borderRadius:SIZES.radiusLg,
                borderWidth:2,
                alignItems:'center',
                borderColor:'transparent',
                padding:15,
                marginHorizontal:5,
                flex:1,
                shadowColor: "rgba(0,0,0,.5)",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.30,
                shadowRadius: 4.65,

                elevation: 8,
              }]}
            >
              <View
                style={{
                  height:45,
                  width:45,
                  backgroundColor:'#09B6C1',
                  borderRadius:45,
                  alignItems:'center',
                  justifyContent:'center',
                  marginTop:-35,
                  marginBottom:12,
                }}
              >
                  <Image
                    style={{
                      height:22,
                      width:22,
                      tintColor:COLORS.white,
                    }}
                    source={IMAGES.pay}
                  />
              </View>
              <Text style={{...FONTS.fontLg,...FONTS.fontMedium,color:colors.title}}>106.54 USD</Text>
              <Text style={{...FONTS.fontSm,color:colors.text}}>You Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={.95}
              style={[{
                backgroundColor:colors.bgLight,
                borderRadius:SIZES.radiusLg,
                padding:15,
                marginHorizontal:5,
                borderWidth:2,
                alignItems:'center',
                borderColor:'transparent',
                flex:1,
                shadowColor: "rgba(0,0,0,.5)",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.30,
                shadowRadius: 4.65,

                elevation: 8,
              }]}
            >
              <View
                style={{
                  height:45,
                  width:45,
                  backgroundColor:'#BB85FF',
                  borderRadius:45,
                  alignItems:'center',
                  justifyContent:'center',
                  marginTop:-35,
                  marginBottom:12,
                }}
              >
                  <Image
                    style={{
                      height:22,
                      width:22,
                      tintColor:COLORS.white,
                    }}
                    source={IMAGES.get}
                  />
              </View>
              <Text style={{...FONTS.fontLg,...FONTS.fontMedium,color:colors.title}}>156.26 USD</Text>
              <Text style={{...FONTS.fontSm,color:colors.text}}>You Get</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              paddingTop:0,
              flex:1,
              overflow:'hidden',
              backgroundColor:colors.background,
            }}
          >
            <View
                style={{
                    flex:1,
                }}
            >

              <View style={[GlobalStyleSheet.container,{
                  padding:0,
                  marginHorizontal:15,
                  flexDirection:'row',
                  marginBottom:12,
                  marginTop:0,
                  justifyContent:'space-between',
              
          
              }]}>

                  <Ripple 
                      onPress={() => {setWalletRBSheet('deposit'), refRBSheet.current.open()}}
                      style={{
                          backgroundColor:COLORS.primary,
                          flexDirection:'row',
                          alignItems:'center',
                          justifyContent:'center',
                          marginLeft:8,
                          borderRadius:SIZES.radius,
                          overflow:'hidden',
                          paddingHorizontal:10,
                          height:45,
                          flex:1,
                      }}>
                     
                         
                        
                      <Text style={{...FONTS.h6,color:COLORS.white}}>Buy Ticket</Text>
                  </Ripple>


                  <Ripple
                      onPress={()=> { setWalletRBSheet('withdraw');refRBSheet.current.open()}}
                      style={{
                          backgroundColor:COLORS.primary,
                          flexDirection:'row',
                          alignItems:'center',
                          justifyContent:'center',
                          marginRight:8,
                          borderRadius:SIZES.radius,
                          position:'relative',
                          paddingHorizontal:10,
                          overflow:'hidden',
                          height:45,
                          flex:1,
                      }}>
                     
                      <Text style={{...FONTS.h6,color:COLORS.white}}>Fund Wallet</Text>
                  </Ripple>
                  

                 
              </View>


              <View
                style={{
                  flexDirection:'row',
                  alignItems:'center',
                  justifyContent:'space-between',
                  marginHorizontal:15,
                  paddingVertical:2,
                  marginBottom:6,
                }}
              >
                <Ripple
                  onPress={() => {setWalletRBSheet('convert'), refRBSheet.current.open()}}
                >
                  <Text style={{...FONTS.font,color:COLORS.primary,...FONTS.fontMedium}}>Conversion</Text>
                </Ripple>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                   <View
                        style={[Platform.OS === 'ios' && {
                            transform:[{
                                scale:.8
                            }],
                            marginRight:5,
                        }]}
                    >
                       <Checkbox
                            status={toggleCheckBox ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setToggleCheckBox(!toggleCheckBox);
                            }}
                            color={COLORS.primary}
                        />
                    </View>
                  <Text style={{...FONTS.font,color:colors.title,marginLeft:2}}>Hide 0 Balance</Text>
                </View>
              </View>

              {ListData.map((data,index) => (
                <ListItem
                  key={index}
                  icon={data.icon}
                  coin={data.coin}
                  rate={data.rate}
                  amount={data.amount}
                  subTitle={data.subTitle}
                  bottomSheet={refRBSheet}
                  sheet={setWalletRBSheet}
                />
              ))}
                    
            </View>
         </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};



const ListItem = ({icon,coin,rate,amount,subTitle,navigate,bottomSheet,sheet}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const renderLeftActions = (progress, dragX) => {
    
    return (
      <Animated.View style={[
          {
            flexDirection:'row',
            opacity: 1,
            left:-260,
            marginBottom:8,
            transform:[
                {
                  translateX:dragX,
                }
            ]
          },
        ]}>
        <LinearGradient
          start={{x: 0, y: 1}} end={{x: 1, y: 0.5}}
          colors={['#6F4FEF', '#4628FF']}
          style={{
            flexDirection:'row',
            alignItems:'center',
            paddingHorizontal:10,
            borderTopRightRadius:SIZES.radius,
            borderBottomRightRadius:SIZES.radius,
          }}
        >
          <Ripple
            onPress={()=> navigation.navigate('Deposit')}
            style={styles.swipeBtn}
          >
            <Text style={{...FONTS.font,color:COLORS.white,...FONTS.fontMedium}}>Deposit</Text>
          </Ripple>
          <Ripple
            onPress={()=> navigation.navigate('Withdraw')}
            style={styles.swipeBtn}
          >
            <Text style={{...FONTS.font,color:COLORS.white,...FONTS.fontMedium}}>Withdraw</Text>
          </Ripple>
          <Ripple
            onPress={()=> { sheet('transfer');bottomSheet.current.open()}}
            style={styles.swipeBtn}
          >
            <Text style={{...FONTS.font,color:COLORS.white,...FONTS.fontMedium}}>Transfer</Text>
          </Ripple>
        </LinearGradient>
      </Animated.View>
    );
  };


  return(
    <Swipeable renderLeftActions={renderLeftActions}>
      <View
        style={{...styles.listItem,borderColor:colors.borderColor,backgroundColor:colors.bgLight}}
      >
        <View
          style={{
            flexDirection:'row',
            alignItems:'center',
          }}
        >
          <Image 
              style={{
                height:35,
                width:35,
                marginRight:10,
                resizeMode:'contain',
              }}
              source={icon}/>
          <View>
            <Text style={{...FONTS.h6,color:colors.title,marginBottom:4}}>{coin}</Text>
            <Text style={{...FONTS.fontSm,color:colors.text}}>{subTitle}</Text>
          </View>
        </View>
        <View style={{alignItems:'flex-end'}}>
          <Text style={{...FONTS.h6,color:colors.title,marginBottom:2}}>{amount}</Text>
          <Text style={{...FONTS.fontSm,color:COLORS.success}}>{rate}</Text>
        </View>
      </View>
    </Swipeable>
  )
}




const styles = StyleSheet.create({
  swipeBtn:{
    backgroundColor:'rgba(255,255,255,.1)',
    height:40,
    borderRadius:7,
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:12,
    marginRight:5,
  }, 
  btnContainer: {
    height: 45,
    //overflow: 'hidden',
    flexDirection: 'row',
    width: '100%',
  },
  btnSwipe: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  animatedBtnContainer: {
      height: 45,
      flexDirection: 'row',
      position: 'absolute',
      overflow: 'hidden',
  },
  animatedBtn: {
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
  },
  btnTextActive: {
      color: '#fff',
      fontWeight: 'bold',
  },
  card: {
      width: width,
  },

  listItem:{
    flexDirection:'row',
    marginHorizontal:15,
    paddingVertical:12,
    alignItems:'center',
    justifyContent:'space-between',
    borderWidth:1,
    borderRadius:SIZES.radiusLg,
    marginBottom:8,
    paddingHorizontal:14,
  },
  walletBtn:{
    height:45,
    backgroundColor:COLORS.primary,
    borderRadius:8,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:18 ,
    marginHorizontal:3,
  },
  walletBtnIcon:{
    tintColor:COLORS.white,
    height:18,
    width:18,
    marginRight:5,
  },
  card2:{
    borderWidth:1,
    borderRadius:SIZES.radius,
    marginHorizontal:3,
    flex:1,
    paddingHorizontal:10,
    paddingVertical:8,
    shadowColor: "rgba(0,0,0,.4)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  }

  
})


export default WalletScreen;
