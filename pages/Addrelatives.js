/*Screen to register the user*/
import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import {RadioButton,Text,} from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
export default class contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      c_no: '',
      value: 'Blood',
    };
  }
  add_contact = () => {
    var that = this;
    const { name } = this.state;
    const { c_no } = this.state;
    const { value } = this.state;
    //alert(user_name, user_contact, user_address);
    if (name) {
      if ( c_no) {
        if (value) {
          db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO contacts (name, c_no, value) VALUES (?,?,?)',
              [name, c_no, value],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'contact added Successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                          that.props.navigation.navigate('Vcontact'),
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Failed add contact');
                }
              }
            );
          });
        } else {
          alert('Please select type');
        }
      } else {
        alert('Please insert mobile number');
      }
    } else {
      alert('Please fill name');
    }
  };
  render() {
    console.disableYellowBox="true"
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Enter Name"
              onChangeText={name => this.setState({ name })}
              style={{ padding:10 }}
            />
              <Mytextinput
              placeholder="Enter Contact No"
              onChangeText={c_no => this.setState({ c_no })}
              maxLength={10}
              keyboardType="numeric"
              style={{ padding:10 }}
            />
     </KeyboardAvoidingView>
     <RadioButton.Group 
        onValueChange={value => this.setState({ value })}
        value={this.state.value}
      >
            <View style={{marginTop:40,flexDirection:"row",marginLeft:40}}> 

       <Text style={{fontWeight:"bold",fontSize:15,marginRight:10}}>Relation Type</Text>
        <View style={{marginLeft:20,}}>
          <Text>Blood</Text>
          <RadioButton value="Blood"/>
        </View>
        
        <View style={{marginLeft: 20,}}>
          <Text>Innermost</Text>
          <RadioButton value="Innermost"/>
        </View>
        <View style={{marginLeft: 20,}}>
          <Text>Outer</Text>
          <RadioButton value="outer"/>
        </View>
        </View>
      </RadioButton.Group>
  
            <Mybutton
              title="Submit"
              customClick={this.add_contact.bind(this)}
            />
            
            <Text></Text>
        </ScrollView>

      </View>
    );
  }
}