/*Home Screen With buttons to navigate to different options*/
import React from 'react';
import { View,Text,StyleSheet,Alert,alertMessage,BackHandler,TouchableOpacity,Image,ImageBackground} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import {Ionicons} from 'react-native-vector-icons';
import {IconButton,Appbar}from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
var db = openDatabase({ name: 'UserDatabase.db' });


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='work'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS work', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS work(work_id INTEGER PRIMARY KEY AUTOINCREMENT, work_name VARCHAR(20), work_date VARCHAR(25), rem_date VARCHAR(25))',
              []
            );
          }
        }
      );
    });
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='workerequest'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS workerequest', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS workerequest(work_id INTEGER REFERENCES work(work_id) ON UPDATE CASCADE ON DELETE CASCADE, worker_name VARCHAR(20),c_no NUMERIC(10))',
              []
            );
          }
        }
      );
    });
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='event'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS event', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS event(event_id INTEGER PRIMARY KEY AUTOINCREMENT, event_name VARCHAR(20), discription VARCHAR(50), event_date VARCHAR(25), rem_date VARCHAR(25), relative NUMERIC(10))',
              []
            );
          }
        }
      );
    });
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='invites'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS invites', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS invites(event_id INTEGER REFERENCES event(event_id) ON UPDATE CASCADE ON DELETE CASCADE, rname VARCHAR(20),contact NUMERIC(10))',
              []
            );
          }
        }
      );
    });
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='purchase'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS purchase', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS purchase(purch_id INTEGER PRIMARY KEY AUTOINCREMENT,type VARCHAR(20), i_list VARCHAR(20), seller VARCHAR(25),c_no  INTEGER(10), ddate VARCHAR(25), pay_status VARCHAR(15))',
              []
            );
          }
        }
      );
    });
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='seller'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS seller', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS seller(seller_id INTEGER,name VARCHAR(20),contact NUMERIC(10)),shop_name VARCHAR(20)',
              []
            );
          }
        }
      );
    });
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='bill'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS bill', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS bill(bill_id INTEGER PRIMARY KEY AUTOINCREMENT, bill_type VARCHAR(20), due_date VARCHAR(25), rem_date VARCHAR(25))',
              []
            );
          }
        }
      );
    });
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='diary'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS diary', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS diary(entry_id INTEGER PRIMARY KEY AUTOINCREMENT, type VARCHAR(20), entry VARCHAR(25), expense VARCHAR(25),ddate VARCHAR(25),fun_date VARCHAR(25),  rem_date VARCHAR(25))',
              []
            );
          }
        }
      );
    });
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='vehicle'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS vehicle', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS vehicle( rq_id INTEGER PRIMARY KEY AUTOINCREMENT,evnt_name VARCHAR(15), name VARCHAR(20),c_no  INTEGER(10), vdate VARCHAR(25))',
              []
            );
          }
          
        }
      );
    });
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='contacts'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS contacts', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS contacts(name VARCHAR(20), c_no  INTEGER(10) PRIMARY KEY,value VARCHAR(10))',
              []
            );
          }
        }
      );
    });
  }
  toggleDrawer = () => {
    //Props to open/close the drawer
     this.props.navigation.toggleDrawer();  
  };
  render() {
    return (
      <ImageBackground
      blurType="light"
            blurAmount={0.5}
            blurRadius={1}
        style={{ flex: 1 ,}}
      
        source={
          require('./logo/background.jpg') 
        }
        >
      <View
        style={{
          flex: 1,
         
          flexDirection: 'column',
        }}>
          
         <Appbar.Header>
         <Appbar.Action icon="menu"
         onPress={this.toggleDrawer.bind(this)}
        />
        <Text style={{marginRight:180,fontSize:20,fontWeight:"bold",color:"white"}} >Menu </Text>
        <Appbar.Action icon="power" 
         onPress={() =>{Alert.alert(
          'Are you sure ?',
          alertMessage,
          [
            {text: 'No'},
            {text: 'Exit', onPress: () => BackHandler.exitApp()} 
          ]
          );}}
        />
      </Appbar.Header>
        <View style={styles.View}>
              <Text style={styles.container}> Home Assistant </Text>
             </View>
             <ScrollView>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('Contacts')}style={styles.Button}>
                 <Text style={styles.Text}>Add Contacts</Text></TouchableOpacity>
             <View style={{flexDirection:"row"}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Work')}style={styles.Button1}>
                 <Text style={styles.Text1}>Work</Text></TouchableOpacity>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('Event')}style={styles.Button1}>
                 <Text style={styles.Text1}>Event</Text></TouchableOpacity>
             </View>
             <View style={{flexDirection:"row"}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Viewvehicle')}style={styles.Button1}>
                 <Text style={styles.Text1}>Book Vehicle</Text></TouchableOpacity>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('Purchase')}style={styles.Button1}>
                 <Text style={styles.Text1}>Purchase</Text></TouchableOpacity>
             </View>
             <View style={{flexDirection:"row"}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Bill')}style={styles.Button1}>
                 <Text style={styles.Text1}>Payments</Text></TouchableOpacity>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('Diary')}style={styles.Button1}>
                 <Text style={styles.Text1}>Diary</Text></TouchableOpacity>
             </View>
             <View style={{alignItems:"center",marginTop:50}}>
          <Text> Version </Text>
          <Text style={{color:"red"}}> 1.0.1</Text>
       </View>  
        </ScrollView>
      </View>
      </ImageBackground>
    );
  }
}
const styles=StyleSheet.create({
 
  container:{
    color:"white",
    textAlign:'center',
    fontSize:45,
    fontWeight:'bold',
    borderRadius:10,
    marginTop:5,
    textShadowColor: 'black', 
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 10
  },
  View:{
    padding:5,
  },
  Button:{
    backgroundColor:"#FAC42F",
    alignItems:"center",
    marginLeft:80,
    marginRight:80,
    height:50,
    borderRadius:20,
    marginTop:5,
    elevation:10,
    borderWidth:2,
    borderBottomColor:"red",
    borderTopColor:"red"
  },
  Text:{
    fontSize:25,
    fontWeight:"bold",
    color:"white",
    marginTop:8
  },
  Button1:{
    backgroundColor:"skyblue",
    alignItems:"center",
    marginLeft:10,
    marginRight:30,
    height:50,
    width:150,
    marginTop:30,
    borderRadius:10,
    elevation:8,
    borderWidth:2,
    borderColor:'blue'
  },
  Text1:{
    fontSize:20,
    fontWeight:"bold",
    color:"white",
    marginTop:8,
    
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  }
  });
 
  