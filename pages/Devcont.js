
import React, { Component } from 'react';
import { View, Text,Button } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
 
export default class Devcont extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  getContact=()=>{
    var SendIntentAndroid = require("react-native-send-intent");
 
// SendIntentAndroid.sendSms("","SMS body text here");

    PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          'title': 'Contacts',
          'message': 'This app would like to view your contacts.',
          'buttonPositive': 'Alow'
        }
      ).then(() => {
        Contacts.getAll((err,contacts) => {
          if (err === 'denied'){
            // error
          } else {
           console.log(contacts);
          }
        })
      })
  }

  render() {
    return (
      <View>
        <Button title="click me" onPress={this.getContact}></Button>
      </View>
    );
  }
}
<SafeAreaView style={{ flex: 2 }}>
<View style={{ flex: 1, padding: 30 }}>
  <MultiSelect
    hideTags
    items={this.state.name}
    uniqueKey="name"
    ref={component => {
      this.multiSelect = component;
    }}
    onSelectedItemsChange={this.onSelectedItemsChange}
    selectedItems={selectedItems}
    selectText="Select workers"
    searchInputPlaceholderText="Search Items..."
    onChangeInput={text => console.log(text)}
    tagRemoveIconColor="#CCC"
    tagBorderColor="#CCC"
    tagTextColor="#CCC"
    selectedItemTextColor="#CCC"
    selectedItemIconColor="#CCC"
    itemTextColor="#000"
    displayKey="name"
    searchInputStyle={{ color: '#CCC' }}
    submitButtonColor="#48d22b"
    submitButtonText="Submit"
  />

</View>

</SafeAreaView>    
 onSelectedItemsChange = selectedItems => {
  this.setState({ selectedItems });
  //Set Selected Items
};