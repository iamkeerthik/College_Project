// This is an Example to Send WhatsApp Message from React Native App
import React, { Component } from 'react';
import { View, StyleSheet, Text, Linking, TextInput, Button,ToastAndroid } from 'react-native';
import Mytextinput from './components/Mytextinput';
import {Dropdown} from 'react-native-material-dropdown';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext'
 
export default class WorkReq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile_no: '',
      msg: '',
      worker:[],
      nm:'',
      c_no:'',
      work:[]
    };
    
    db.transaction(tx => {
        tx.executeSql('SELECT name FROM contacts', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            console.log(temp)
          }
          this.setState({
            worker: temp,
          });
          
        });
      });
      db.transaction(tx => {
        tx.executeSql('SELECT work_id FROM work', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            console.log(temp)
          }
          this.setState({
            work: temp,
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
    console.log(id)
            db.transaction(function(tx) {
              tx.executeSql(
                'INSERT INTO workerequest(work_id, worker_name, c_no) VALUES (?,?,?)',
                [id,nm,mobile_no],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                    console.log("sucess")
                    
                      ToastAndroid.showWithGravity('request added succesfully', ToastAndroid.SHORT,ToastAndroid.CENTER);
                  
                  } else {
                    ToastAndroid.showWithGravity('unable to add request', ToastAndroid.SHORT,ToastAndroid.CENTER);
                    console.log("Failed")
                  }
                }
              );
            }); 
         
   }
  sendText=()=>{
    var SendIntentAndroid = require("react-native-send-intent");
    let id=this.state.id;
    let msg = this.state.msg;
    let mobile_no = this.state.mobile_no;
    if(mobile_no){
      if(id){
      if(msg){
        SendIntentAndroid.sendSms(`${mobile_no}`, `${msg}`);
        this.Insert();
        this.props.navigation.navigate('Work');
      }else{
        alert('Please insert message to send');
      }
    }else{
      alert('Please select work');
    }
    }else{
      alert('Please select worker ');
    }
  }
  sendOnWhatsApp=() => {
    let id=this.state.id;
    let msg = this.state.msg;
    let mobile_no = this.state.mobile_no;
    if(mobile_no){
     if(id){
      if(msg){
        let url = 'whatsapp://send?text=' + this.state.msg + '&phone=91' + this.state.mobile_no;
        Linking.openURL(url).then((data) => {
          this.Insert();
        this.props.navigation.navigate('Work');
          console.log('WhatsApp Opened');
        }).catch(() => {
          alert('Make sure Whatsapp installed on your device');
        });
      }else{
        alert('Please insert message to send');
      }
    }else{
      alert('Please select work');
    }
    }else{
      alert('Please select worker');
    }
  }
  main=()=>{
   
    this.sendOnWhatsApp();
  }
  main2=()=>{
    
    this.sendText();
  }
  render() {
    
    return (
    <View style={{marginTop:100}}>
      <View style={{marginLeft:50,marginRight:50,marginBottom:30,marginTop:-40}}>
             
             <Dropdown label='Choose worker'
             data={this.state.worker} 
             valueExtractor={({ name }) => name}
             onChangeText={(nm) => {this.setState({nm: nm });this.fetch();}}
             /></View>
          <View style={{marginLeft:50,marginRight:50,marginBottom:30,marginTop:-40}}>
             
             <Dropdown label='Choose work'
             data={this.state.work} 
             valueExtractor={({ work_id }) => work_id}
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
            onPress={this.sendText}
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