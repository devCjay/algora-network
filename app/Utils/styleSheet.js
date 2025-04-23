import { COLORS, FONTS, SIZES } from './theme';
export const GlobalStyleSheet = {
    contentArea : {
        paddingTop:50,
    },
    container : {
        paddingHorizontal: 15,
        paddingVertical: 15,
        maxWidth: SIZES.container,
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    row : {
        flexDirection : 'row',
        marginHorizontal : -5,
        flexWrap : 'wrap',
    },
    col33 : {
        width : '33.33%',
        paddingHorizontal : 5,
    },
    col66 : {
        width : '66.67%',
        paddingHorizontal : 5,
    },
    col50 : {
        width : '50%',
        paddingHorizontal : 5,
    },
    col100:{
        width : '100%',
        paddingHorizontal : 5,
    },
    card:{
        padding:15,
        borderRadius:SIZES.radius,
        marginBottom:15,
    },
    cardHeader:{
        borderBottomWidth:1,
        borderColor:'rgba(255,255,255,.2)',
        paddingHorizontal:15,
        paddingVertical:15,
    },
    cardFooter:{
        borderTopWidth:1,
        borderColor:'rgba(255,255,255,.2)',
        paddingHorizontal:15,
        paddingVertical:15,
    },
    cardBody:{
        paddingHorizontal:20,
        paddingVertical:15,
    },
    changeIcon:{
        height:40,
        width:40,
        borderRadius:20,
        borderWidth:1,
        borderColor:'rgba(255,255,255,.2)',
        alignItems:'center',
        justifyContent:'center',
    },
    listItem:{
        paddingHorizontal:15,
        paddingVertical:10,
        borderBottomWidth:1,
        borderColor:'rgba(255,255,255,.2)',
        marginBottom:-1,
        flexDirection:'row',
        alignItems:'center',
    },
    listIcon:{
        height:35,
        width:35,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginRight:10,
    },
    listCoinImage: {
        height:30,
        width:30,
        marginRight:10,
    },
    listIconStyle:{
        tintColor:COLORS.white,
        height:17,
        width:17,
    },
    Input:{
        paddingHorizontal:18,
        borderRadius:SIZES.radius,
        ...FONTS.font,
    },
    formControl:{
        borderRadius:10,
        paddingHorizontal:15,
        height:48,
        paddingVertical:8,
        fontSize:15,
        borderWidth:1,
        borderWidth:1,
        borderColor:'transparent',
        fontFamily:'Poppins-Regular',
    },
    modalHeader:{
        paddingHorizontal:20,
        paddingBottom:20,
        paddingTop:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    modalBody:{
        padding:20,
    },
    gradient : ['rgba(255,255,255,.12)', 'rgba(255,255,255,.18)','rgba(255,255,255,.12)'],
    shadow:{
        shadowColor: "rgba(0,0,0,.5)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
}