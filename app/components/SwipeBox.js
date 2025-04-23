import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    TouchableOpacity,
    Image,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { COLORS, FONTS } from '../Utils/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class SwipeBox extends Component {
    
  leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity onPress={() => { this.close(); this.props.handleDelete()}} activeOpacity={0.6}>
        <View style={styles.deleteBox}>
          <Animated.Text style={{...FONTS.font,fontSize:16,top:1,color:COLORS.white,transform: [{scale: scale}]}}>
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  updateRef = ref => {
    this._swipeableRow = ref;
  };
  close = () => {
    this._swipeableRow.close();
  };

  render(){
    
      return (
          <Swipeable
              ref={this.updateRef}
              friction={2}
              renderLeftActions={this.leftSwipe}>
            <View style={[styles.list,{backgroundColor:this.props.colors.background}]}>
              <Image
                source={this.props.data.icon}
                style={{
                  height:35,
                  width:35,
                  resizeMode:'contain',
                  marginRight:10,
                }}
              />
              <View style={{flex:1}}>
                  <Text style={{...FONTS.font,color:this.props.colors.title,fontSize:16,marginBottom:2}}>{this.props.data.coin}</Text>
                  <Text style={{...FONTS.fontSm,color:this.props.colors.text}}>{this.props.data.subTitle}</Text>
              </View>
              <View style={{alignItems:'flex-end'}}>
                  <Text style={{...FONTS.font,color:this.props.colors.title,fontSize:16,marginBottom:2}}>{this.props.data.amount}</Text>
                  <Text style={{...FONTS.fontSm,color:COLORS.success}}>{this.props.data.rate}</Text>
              </View>
            </View>
        </Swipeable>
        );
    }
};
const styles = StyleSheet.create({
  list: {
    flexDirection:'row',
    paddingHorizontal:15,
    paddingVertical:15,
    alignItems:'center',
  },
  deleteBox: {
    backgroundColor: COLORS.danger,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
});
