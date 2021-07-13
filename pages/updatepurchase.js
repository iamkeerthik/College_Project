/*Screen to update the user*/
import React from 'react';
import { View, YellowBox, ScrollView, KeyboardAvoidingView, Alert, } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {Dropdown} from 'react-native-material-dropdown';
import {RadioButton,Text,} from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
 
export default class UpdateWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_purchase_id: '',
      i_list: '',
      seller: [],
      old_seller:'',
      pay_status: '',
      purch_id:[],
      nm:''
    };
    db.transaction(tx => {
      tx.executeSql('SELECT purch_id FROM purchase', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log(temp)
        }
        this.setState({
          purch_id: temp,
        });
        
      });
    });
    db.transaction(tx => {
      tx.executeSql('SELECT name FROM contacts where value="Seller"', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log(temp)
        }
        this.setState({
          seller: temp,
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
          c_no:temp2[0].c_no,
        });
        
      });
    });
   }
  searchpurchase = () => {
    const {input_purchase_id} =this.state;
    console.log(input_purchase_id);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM purchase where purch_id = ?',
        [input_purchase_id],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len',len);
          if (len > 0) {
            console.log(results.rows.item(0).purch_id);
            this.setState({
             i_list:results.rows.item(0).i_list,
            });
            this.setState({
            old_seller:results.rows.item(0).seller,
            });
            this.setState({
             pay_status:results.rows.item(0).pay_status,
            });
          }
          else{
            alert('Please select purchase id');
            this.setState({
               i_list:'',
               seller:'',
              pay_status:'',
            });
          }
        }
      );
    });
  };
  Updatepurchase = () => {
    var that=this;
    const { input_purchase_id } = this.state;
    const { i_list } = this.state;
    const {nm } = this.state;
    const { pay_status } = this.state;
    if (i_list){
      if (nm){
        if (pay_status){
          db.transaction((tx)=> {
            tx.executeSql(
              'UPDATE purchase set i_list=?, seller=? , pay_status=? where purch_id=?',
              [i_list,nm, pay_status, input_purchase_id],
              (tx, results) => {
                console.log('Results',results.rowsAffected);
                if(results.rowsAffected>0){
                  Alert.alert(
                    'Updated',
                    'purchase Updated Successfully,do you want to place order once again ?',

                    [
                      {text: 'No', onPress: () => that.props.navigation.navigate('HomeScreen')},
                      {
                        text: 'Yes',
                        onPress: () =>
                          that.props.navigation.navigate('Placeorder',{i_list: that.state.i_list,seller: that.state.seller} )
                      },    
                    ],
                    { cancelable: false }
                  );
                }else{
                  alert('Updation Failed');
                }
              }
            );
          });
        }else{
          alert('Please fill payment status');
        }
      }else{
        alert('Please select seller name');
      }
    }else{
      alert('Please fill item list');
    }
  };
 
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={{marginLeft:50,marginRight:50,marginBottom:20,marginTop:20,}}> 
             <Dropdown label='Choose Purchase Id'
             data={this.state.purch_id} 
             valueExtractor={({ purch_id }) => purch_id}
             onChangeText={(input_purchase_id) => {this.setState({input_purchase_id })}}
             baseColor="black"
             /></View>
            <Mybutton
              title="Search purchase"
              customClick={this.searchpurchase.bind(this)}
            />
        
            <Mytextinput
              placeholder="Enter Items"
              value={this.state.i_list}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              onChangeText={i_list => this.setState({ i_list })}
              style={{textAlignVertical : 'top', padding:10}}
            />
             <View style={{marginLeft:50,marginRight:50,marginBottom:-20,marginTop:10}}>
             
             <Dropdown label='Choose Seller'
             data={this.state.seller} 
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
              title="Update purchase"
              customClick={this.Updatepurchase.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
