/*Screen to register the user*/
import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert,TouchableOpacity} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
import {RadioButton,Text,} from 'react-native-paper';
import {Dropdown} from 'react-native-material-dropdown';
import MultiSelect from 'react-native-multiple-select';
export default class AddPurchase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        i_list:'',
        nm:'',
        seller:'',
        pay_status: 'Paid',
        name:[],
        event_name:[], 
        evntnm:'',
    };
    
    db.transaction(tx => {
      tx.executeSql('SELECT name FROM contacts where value="Seller"', [], (tx, results) => {
        var temp=[];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log(temp)
        }
        this.setState({
          name:temp,
        });
        
      });
    });
    db.transaction(tx => {
        tx.executeSql('SELECT event_name FROM event ', [], (tx, results) => {
          var temp1=[];
          for (let i = 0; i < results.rows.length; ++i) {
            temp1.push(results.rows.item(i));
            console.log(temp1)
          }
          this.setState({
            event_name:temp1,
          });
          
        });
      });
  }
  fetch=()=>{
    const {nm}=this.state;
    db.transaction(tx => {
      tx.executeSql(`SELECT c_no FROM contacts where name="${nm}"`, [], (tx, results) => {
        var temp2 = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp2.push(results.rows.item(i));
          // console.log(temp2[0].c_no)
        }
        this.setState({
          seller:temp2[0].c_no,
        });
        
      });
    });
   }
 
  add_purchase = () => {
   
    var that = this;
    const { i_list } = this.state;
    const { seller } = this.state;
    const { pay_status } = this.state;
    const {evntnm}=this.state;
    const {nm}=this.state;
    var date = new Date()//return today    
    
    const formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
   console.log(formattedDate)
  //  var slr=seller[0];
  //  console.log(slr.c_no);
  console.log(seller)
  if (evntnm){
    if (i_list) {
      if (nm) {
        if (pay_status) {
          db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO purchase (type,i_list, seller,c_no, ddate, pay_status) VALUES (?,?,?,?,?,?)',
              [evntnm,i_list, nm,seller, formattedDate, pay_status],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'purchase added Successfully',

                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                          that.props.navigation.navigate('Placeorder',{i_list: that.state.i_list,seller: that.state.seller} )
                      },  
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Failed add purchase');
                }
              }
            );
          });
        } else {
          alert('Please select payment status');
        }
      } else {
        alert('Please select seller');
      }
    } else {
      alert('Please fill item list ');
    }
 } else {
    alert('Please select event name ');
  }  
};
  render() {
   
     console.disableYellowBox="true"
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
          <View style={{flexDirection:"row"}}>
           <View style={{marginLeft:30,marginRight:30,width:160}}>
             <Dropdown label='Choose Event'
             data={this.state.event_name} 
             valueExtractor={({ event_name }) => event_name}
             onChangeText={(evntnm) => {this.setState({evntnm: evntnm });this.fetch();}}
             />  
             </View>
             <TouchableOpacity style={{margin:30,backgroundColor:"lightgreen",width:70,height:25,alignItems:"center",elevation:8}} onPress={() => this.props.navigation.navigate('Addpurchase')}>
                <Text style={{color:"white",fontWeight:"bold",fontSize:20}}>Others</Text>

                </TouchableOpacity>
             </View>
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Enter Items"
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              onChangeText={i_list => this.setState({ i_list })}
              style={{textAlignVertical : 'top', padding:10}}
            />
            
            <View style={{marginLeft:50,marginRight:50,marginBottom:-30,marginTop:-40}}>
             
           <Dropdown label='Choose Seller'
           data={this.state.name} 
           valueExtractor={({ name }) => name}
           onChangeText={(nm) => {this.setState({nm: nm });this.fetch();}}

           /></View>
             <RadioButton.Group 
        onValueChange={pay_status => this.setState({ pay_status })}
        value={this.state.pay_status}
      >
            <View style={{marginTop:40,flexDirection:"row",marginLeft:10,backgroundColor:"lightyellow",marginRight:20,borderRadius:8,elevation:8}}> 
            <Text style={{fontWeight:"bold",fontSize:20,marginRight:10}}>      Payment status</Text>

        <View style={{marginLeft:10,}}>
          <Text>paid</Text>
          <RadioButton value="Paid"/>
        </View>
        <View style={{marginLeft: 15,}}>
          <Text>Not paid</Text>
          <RadioButton value="Not paid"  />
        </View>
        </View>
      
      </RadioButton.Group>
            <Mybutton
              title="Place Order"
              customClick={this.add_purchase.bind(this)}
            /> 
            <Text></Text>
          </KeyboardAvoidingView>
        
      </View>
    );
  }
}