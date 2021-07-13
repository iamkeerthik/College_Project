
import React from 'react';
import { View,ScrollView,Image} from 'react-native';
import { createAppContainer,SafeAreaView } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer'
import MSG from './pages/Sendmessage';
import HomeScreen from './pages/HomeScreen';
import Addwork from './pages/addwork';
import ViewUser from './pages/ViewUser';
import ViewAllUser from './pages/ViewAllUser';
import Deletework from './pages/Deletework';
import Addevent from './pages/addevent';
import Work from './pages/work';
import Event from './pages/event';
import Purchase from './pages/purchase';
import Addpurchase from './pages/addpurchase';
import Bill from './pages/bill';
import Addbill from './pages/addbill';
import Diary from './pages/dairy';
import Adddiary from './pages/adddairy';
import Contacts from './pages/contacts';
import Vcontact from './pages/view contacts';
import Seller from './pages/sellercontact';
import Updatework from './pages/Updatework';
import Updateevent from './pages/Updateevent';
import Delevent from './pages/Delevent';
import Delbill from './pages/Delbill';
import Updatebill from './pages/UpdateBill';
import Delpurchase from './pages/DelPurchase';
import Updatepurchase from './pages/updatepurchase';
import DefaultAddwork from './pages/AddworkDefault';
import Worker from './pages/worker';
import Search from './pages/Search';
import otherbill from './pages/otherbill';
import Addcont from './pages/addcontacts';
import Delcont from './pages/delcontacts';
import Upcont from './pages/updatecont';
import Workrequest from './pages/workrequest';
import Placeorder from './pages/placeorder';
import Invites from './pages/invites';
import Vehicle from './pages/bookvehicle';
import BookVehicle from  './pages/vehiclereq';
import  Viewvehicle from './pages/Vehicle';
import DelVehicle from './pages/delvehicle';
import About from './pages/About';
import Share from './pages/share';
import Rate from './pages/rate';
import Eventpurchase from './pages/eventpurchase';
import Invite_sent from './pages/invites_sent';
import Splash from './pages/splash';
import Cancelpurchase from './pages/cancelpurchase';
import Cancelpurchmsg from './pages/cancelpurchmsg';
import Cancelvehicle from './pages/cancelvehicle';
import cancelvehiclemsg from './pages/cancelmessage';
const DrawerNavigatorExample = createDrawerNavigator({
    HomeScreen: {
      navigationOptions: { 
        drawerIcon: ({ tintColor }) => (
          <Icon name="md-home" style={{ color: tintColor,fontSize:25 }} />
        ),
        drawerLabel: "Home",
      },
      screen: HomeScreen
    },
    About: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-person" style={{ color: tintColor,fontSize:25 }} />
        ),
        drawerLabel: "About"
      },
      screen: About
    },
    Share: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-share" style={{ color: tintColor,fontSize:25 }} />
        ),
        drawerLabel: "Share",
      
      },
      screen: Share
    },
    Rate: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="md-star" style={{ color: tintColor,fontSize:25 }} />
        ),
        drawerLabel: "Rate"
      },
      screen:Rate
    },
  },
    {
      contentComponent: (props) => (
       <SafeAreaView>
           <View style={{height: 100,alignItems: 'center', justifyContent: 'center',backgroundColor:"lightblue",elevation:8,borderRadius:10,margin:2}}>
   
              <Image style={{height:200,width:250,marginRight:50,marginTop:10}} source={require('./pages/logo/logo.png')} />
           </View>
         <ScrollView>
           <DrawerItems {...props} />
         </ScrollView>
       </SafeAreaView>
      )
     
  });
const App = createStackNavigator({
   
  // Splash:{
  //   screen:Splash,
   
  // },
  DrawerNavigatorExample:{
   screen:DrawerNavigatorExample,
   navigationOptions: {
 header:null
  }
 },
  Work: {
    screen: Work,
    navigationOptions: {
      title: 'work',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  Worker: {
    screen: Worker,
    navigationOptions: {
      title: 'work request',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  DefaultAddwork: {
    screen: DefaultAddwork,
    navigationOptions: {
      title: 'Add work',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
   Addwork: {
    screen: Addwork,
    navigationOptions: {
      title: 'Add work',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
 
  Deletework: {
    screen: Deletework,
    navigationOptions: {
      title: 'Delete work',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
   Updatework:{
  screen:Updatework,
  navigationOptions: {
   title: 'Update work',
   headerStyle: { backgroundColor: '#f05555' },
   headerTintColor: '#ffffff',
 }
},
Workrequest: {
  screen: Workrequest,
  navigationOptions: {
    title: 'Work Request',
    headerStyle: { backgroundColor: '#f05555' },
    headerTintColor: '#ffffff',
  },
},
   Event: {
    screen: Event,
    navigationOptions: {
      title: 'Event',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  Invite_sent: {
    screen: Invite_sent,
    navigationOptions: {
      title: 'Invited',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
   Addevent: {
    screen: Addevent,
    navigationOptions: {
      title: 'add event',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
   Delevent: {
    screen: Delevent,
    navigationOptions: {
      title: 'Delete event',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
   Updateevent:{
  screen:Updateevent,
  navigationOptions: {
   title: 'Update event',
   headerStyle: { backgroundColor: '#f05555' },
   headerTintColor: '#ffffff',
 }
},
Invites:{
  screen:Invites,
  navigationOptions: {
   title: 'Invites',
   headerStyle: { backgroundColor: '#f05555' },
   headerTintColor: '#ffffff',
 }
},
 Purchase: {
    screen: Purchase,
    navigationOptions: {
      title: 'Purchase',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  Eventpurchase: {
    screen: Eventpurchase,
    navigationOptions: {
      title: 'Add Purchases',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
   Addpurchase: {
    screen: Addpurchase,
    navigationOptions: {
      title: 'Add Purchase',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  Delpurchase: {
    screen: Delpurchase,
    navigationOptions: {
      title: 'Delete Purchase',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  Updatepurchase: {
    screen: Updatepurchase,
    navigationOptions: {
      title: 'Update Purchase',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  Placeorder: {
    screen: Placeorder,
    navigationOptions: {
      title: 'Place Order',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  Seller: {
    screen: Seller,
    navigationOptions: {
      title: 'Add Seller',
    }
  },
   Bill: {
    screen: Bill,
    navigationOptions: {
      title: 'Payments',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  Addbill: {
    screen:Addbill,
    navigationOptions: {
      title: 'Add Payments',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  otherbill: {
    screen:otherbill,
    navigationOptions: {
      title: 'Other Payments',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  Delbill: {
    screen:Delbill,
    navigationOptions: {
      title: 'Delete Payments',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  Updatebill: {
    screen:Updatebill,
    navigationOptions: {
      title: 'Update Payments',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  Diary: {
    screen:Diary,
    navigationOptions: {
      title: 'Add Diary',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  Adddiary: {
    screen:Adddiary,
    navigationOptions: {
      title: 'Add ',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  Search:{
  screen:Search,
  navigationOptions: {
    title: 'Search',
    headerStyle: { backgroundColor: '#f05555' },
    headerTintColor: '#ffffff',
 }
},
Vehicle:{
  screen:Vehicle,
  navigationOptions: {
    title: 'Vehicle Booking',
    headerStyle: { backgroundColor: '#f05555' },
    headerTintColor: '#ffffff',
 }
},
BookVehicle:{
  screen:BookVehicle,
  navigationOptions: {
    title: 'Book Vehicle',
    headerStyle: { backgroundColor: '#f05555' },
    headerTintColor: '#ffffff',
 }
},
Viewvehicle:{
  screen:Viewvehicle,
  navigationOptions: {
    title: 'Book Vehicle',
    headerStyle: { backgroundColor: '#f05555' },
    headerTintColor: '#ffffff',
 }
},
DelVehicle:{
  screen:DelVehicle,
  navigationOptions: {
    title: 'Delete Vehicle',
    headerStyle: { backgroundColor: '#f05555' },
    headerTintColor: '#ffffff',
 }
},
  Contacts: {
    screen: Contacts,
    navigationOptions: {
      title: 'Contacts',
      headerStyle: { backgroundColor: '#f05555' },
    headerTintColor: '#ffffff',
    }
  },
  Addcont: {
    screen: Addcont,
    navigationOptions: {
      title: 'Add Contacts',
      headerStyle: { backgroundColor: '#f05555' },
    headerTintColor: '#ffffff',
    }
  },
  Delcont: {
    screen: Delcont,
    navigationOptions: {
      title: 'Delete Contacts',
      headerStyle: { backgroundColor: '#f05555' },
    headerTintColor: '#ffffff',
    }
  },
  Upcont: {
    screen: Upcont,
    navigationOptions: {
      title: 'Update Contacts',
      headerStyle: { backgroundColor: '#f05555' },
    headerTintColor: '#ffffff',
    }
  },
  
  Vcontact: {
    screen: Vcontact,
    navigationOptions: {
      title: 'View Contacts',
    }
  },
  
  MSG:{
    screen:MSG,
    navigationOptions: {
     title: 'Send Mesaage',
     headerStyle: { backgroundColor: '#f05555' },
     headerTintColor: '#ffffff',
   }
  },
  View: {
    screen: ViewUser,
    navigationOptions: {
      title: 'View User',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  ViewAll: {
    screen: ViewAllUser,
    navigationOptions: {
      title: 'View All User',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  Cancelpurchase:{
    screen:Cancelpurchase,
    navigationOptions: {
      title: 'Cancel purchase',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
   }
  },
  Cancelpurchmsg:{
    screen:Cancelpurchmsg,
    navigationOptions: {
      title: 'Cancel request',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
   }
  },
  Cancelvehicle:{
    screen:Cancelvehicle,
    navigationOptions: {
      title: 'Cancel booking',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
   }
  },
  cancelvehiclemsg:{
    screen:cancelvehiclemsg,
    navigationOptions: {
      title: 'Cancel booking request',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
   }
  },
});
export default createAppContainer(App);