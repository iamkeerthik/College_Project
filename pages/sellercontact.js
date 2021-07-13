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
      contact: '',
      shop_name:'',
    };
  }
  add_contact = () => {
    var that = this;
    const { name } = this.state;
    const { contact } = this.state;
    const { shop_name } = this.state;
    //alert(user_name, user_contact, user_address);
    if (name) {
      if ( contact) {
        if (shop_name) {
          db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO seller (name, contact, shop_name) VALUES (?,?,?)',
              [name, contact, shop_name],
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
          alert('Please Enter shop_name');
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
              onChangeText={contact => this.setState({ contact })}
              maxLength={10}
              keyboardType="numeric"
              style={{ padding:10 }}
            />
              <Mytextinput
              placeholder="Enter Shop name"
              onChangeText={shop_name => this.setState({ shop_name })}
              style={{ padding:10 }}
            />
          </KeyboardAvoidingView>
     
            <Mybutton
              title="Submit"
              customClick={this.add_contact.bind(this)}
            />
            <Mybutton
              title="Send Message"
              customClick={() => this.props.navigation.navigate('MSG')}
            />
            <Text></Text>
        </ScrollView>

      </View>
    );
  }
}