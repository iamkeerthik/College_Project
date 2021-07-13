// This is an Example to Send WhatsApp Message from React Native App
import React, { Component } from 'react';
import { View, StyleSheet, Text, Linking, TextInput, Button } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile_no: '',
      msg: '',
    };
  }
  sendOnWhatsApp=() => {
    let msg = this.state.msg;
    let mobile = this.state.mobile_no;
    if(mobile){
      if(msg){
        let url = 'whatsapp://send?text=' + this.state.msg;
        
        Linking.openURL(url).then((data) => {
          console.log('WhatsApp Opened');
        }).catch(() => {
          alert('Make sure Whatsapp installed on your device');
        });
      }else{
        alert('Please insert message to send');
      }
    }else{
      alert('Please insert mobile no');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        
        <TextInput
          value={this.state.mobile_no}
          onChangeText={mobile_no => this.setState({ mobile_no })}
          placeholder={'Enter Mobile'}
          style={styles.input}
          keyboardType={'numeric'}
        />
        <TextInput
          value={this.state.msg}
          onChangeText={msg => this.setState({ msg })}
          placeholder={'Enter message'}
          style={styles.input}
        />
        <View style={{marginTop:20}}>
          <Button
            onPress={this.sendOnWhatsApp}
            title= 'Send WhatsApp Message'
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop:50,
    padding: 30,
    backgroundColor: '#ffffff',
  },
 input: {
   width:250,
   height: 44,
   padding: 10,
   margin: 20,
   backgroundColor: '#D3D3D3',
 },
});