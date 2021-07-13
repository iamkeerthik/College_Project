// This is an Example to Send WhatsApp Message from React Native App
import React, { Component } from 'react';
import { View, StyleSheet, Text, Linking, TextInput, Button,ToastAndroid } from 'react-native';
import Mytextinput from './components/Mytextinput';
import {Dropdown} from 'react-native-material-dropdown';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext'
 
export default class invites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile_no: '',
      msg: '',
      rel:[],
      nm:'',
      c_no:'',
      event:[]
    };
    
    db.transaction(tx => {
        tx.executeSql('SELECT name FROM contacts where value="Relative"', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            console.log(temp)
          }
          this.setState({
            rel: temp,
          });
          
        });
      });
      db.transaction(tx => {
        tx.executeSql('SELECT event_id FROM event', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            console.log(temp)
          }
          this.setState({
            event: temp,
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
           console.log(temp2[0].c_no)
        }
        this.setState({
          mobile_no:temp2[0].c_no,
        });
        
      });
    });
   }
   Insert=()=>{
    var that = this;
    const { id } = this.state;
    const { mobile_no } = this.state;
    const { nm } = this.state;
  
            db.transaction(function(tx) {
              tx.executeSql(
                'INSERT INTO invites(event_id,rname,contact) VALUES (?,?,?)',
                [id,nm,mobile_no],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                    console.log("sucess")
                    
                      ToastAndroid.showWithGravity('invites added succesfully', ToastAndroid.SHORT,ToastAndroid.CENTER);
                  
                  } else {
                    ToastAndroid.showWithGravity('unable to add invites', ToastAndroid.SHORT,ToastAndroid.CENTER);
                  }
                }
              );
            });       
          }
   SendText=()=>{
    var SendIntentAndroid = require("react-native-send-intent");
    let msg = this.state.msg;
    let mobile_no = this.state.mobile_no;
    let id=this.state.id;
    if(mobile_no){
      if(id){
      if(msg){
        SendIntentAndroid.sendSms(`${mobile_no}`, `${msg}`);
        this.Insert();
        this.props.navigation.navigate('Event');
      }else{
        alert('Please insert message to send');
      }
    }else{
      alert('Please Select Event');
    }
    }else{
      alert('Please Select Relative');
    }
          }
  sendOnWhatsApp=() => {
    let msg = this.state.msg;
    let mobile_no = this.state.mobile_no;
    let id=this.state.id;
    if(mobile_no){
      if(id){
      if(msg){
        let url = 'whatsapp://send?text=' + this.state.msg + '&phone=91' + this.state.mobile_no;
        Linking.openURL(url).then((data) => {
          this.Insert();
          this.props.navigation.navigate('Event');
          console.log('WhatsApp Opened');
        }).catch(() => {
          alert('Make sure Whatsapp installed on your device');
        });
      }else{
        alert('Please insert message to send');
      }
    }else{
      alert('Please Select Event');
    }
    }else{
      alert('Please Select Relative');
    }
  }
  render() {
    
    return (
    <View style={{marginTop:100}}>
      <View style={{marginLeft:50,marginRight:50,marginBottom:30,marginTop:-40}}>
             
             <Dropdown label='Choose Relative'
             data={this.state.rel} 
             valueExtractor={({ name }) => name}
             onChangeText={(nm) => {this.setState({nm: nm });this.fetch();}}
             /></View>
          <View style={{marginLeft:50,marginRight:50,marginBottom:30,marginTop:-40}}>
             
             <Dropdown label='Choose Event'
             data={this.state.event} 
             valueExtractor={({ event_id }) => event_id}
             onChangeText={(id) => {this.setState({id: id });this.fetch();}}
             /></View>
      <View >
          
           <Mytextinput
                placeholder="Enter message"
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                onChangeText={msg => this.setState({ msg })}
                style={{textAlignVertical : 'top', padding:10}}
           />
        </View>
        <View style={{marginTop:20, paddingLeft:50,paddingRight:50}}>
          <Button
            onPress={this.sendOnWhatsApp}
            title= 'Send WhatsApp Message'
            />
        </View>
        <View style={{alignItems:"center",marginTop:10,marginBottom:-10}}>
        <Text style={{fontWeight:"bold"}}>OR</Text>
        </View>
        <View style={{marginTop:20, paddingLeft:50,paddingRight:50}}>
          <Button
            onPress={this.SendText}
            title= 'Send Text Message'
            />
        </View>
    </View>
    );
  }
}
 