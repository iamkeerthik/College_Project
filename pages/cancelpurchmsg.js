// This is an Example to Send WhatsApp Message from React Native App
import React, { Component } from 'react';
import { View, StyleSheet, Text, Linking, TextInput, Button } from 'react-native';
import Mytextinput from './components/Mytextinput';
import {Dropdown} from 'react-native-material-dropdown';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext'
 
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',  
    };
  }
SendText=()=>{
  var SendIntentAndroid = require("react-native-send-intent");
  const {msg}=this.state;
  let  Vdate= this.props.navigation.getParam('Vdate','Nothing sent');
  let mobile = this.props.navigation.getParam('v_no','Nothing sent');  
  if(mobile){
    if(msg){
      SendIntentAndroid.sendSms(`${mobile}`, `Please cancel purchase for ${Vdate}. ${msg}`);
      this.props.navigation.navigate('Viewvehicle');
    }else{
      alert('Please insert message to send');
    }
  }else{
    alert('Please insert mobile no');
  }
}
  sendOnWhatsApp=() => {
    const {msg}=this.state;
    let  Vdate= this.props.navigation.getParam('Vdate','Nothing sent');
    let mobile = this.props.navigation.getParam('v_no','Nothing sent');  
    console.log(mobile)
    // if(mobile){
      if(msg){
        let url = 'whatsapp://send?text=' +" Please cancel purchase for "+Vdate+".Thank you  " + msg + '&phone=91' + mobile;
        Linking.openURL(url).then((data) => {
          this.props.navigation.navigate('Viewvehicle');
          console.log('WhatsApp Opened');
        }).catch(() => {
          alert('Make sure Whatsapp installed on your device');
        });
      }else{
        alert('Please insert message to send');
      }
    // }else{
    //   alert('Please insert mobile no');
    // }
  }
  render() {   
    return (
    <View>
      <View >
           <Mytextinput
                placeholder="Enter reason to cancel"
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
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50,
    padding:0,
    backgroundColor: '#ffffff',
  },

});