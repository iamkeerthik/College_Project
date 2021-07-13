/*Screen to register the user*/
import React, {Component}  from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert,Text,TouchableHighlight } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import RNCalendarReminders from 'react-native-calendar-reminders';
import { openDatabase } from 'react-native-sqlite-storage';
import {Dropdown} from 'react-native-material-dropdown';
var db = openDatabase({ name: 'UserDatabase.db' });
var SendIntentAndroid = require("react-native-send-intent");
import ValidationComponent from 'react-native-form-validator';
import { TextInput } from 'react-native-paper';
export default class RegisterUser extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      work_name: '',
      work_date: '',
      rem_date: '',
      name:[],
    };
  
  }
  add_rem = () => {
    this.props.navigation.navigate('Work')
    var that = this;
    const { work_name } = this.state;
    const { rem_date } = this.state;
    const {work_date}=this.state;
   
    SendIntentAndroid.addCalendarEvent({
      title:work_name,
      description: `You have work on ${work_date}.`,
      startDate:rem_date,
      endDate:rem_date,
      recurrence: "Does not repeat",
      location: "The Home",
    
    });
 
  };
  _onSubmit() {
    // Call ValidationComponent validate method
    this.validate({
      work_name: {minlength:3, maxlength:15, required: true},  
    });
  }
  add_work = () => {
    var that = this;
    const { work_name } = this.state;
    const { work_date } = this.state;
    const { rem_date } = this.state;

    //alert(user_name, user_contact, user_address);
    if (work_name) {
      if ( work_date) {
        if (rem_date) {
            db.transaction(function(tx) {
              tx.executeSql(
                'INSERT INTO work (work_name, work_date, rem_date) VALUES (?,?,?)',
                [work_name, work_date, rem_date],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                    Alert.alert(
                      'Success',
                      'Work added Successfully',
                      [
                        {
                          text: 'Ok',
                          
                          onPress:(that.add_rem),
                        },
                      ],
                      { cancelable: false }
                    );
                  } else {
                    alert('Failed add work');
                  }
                }
              );
            }); 
         
        } else {
          alert('Please select reminder date');
        }
      } else {
        alert('Please select work date');
      }
    } else {
      alert('Please fill Work Name');
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
              ref="work_name"
              placeholder="Enter Name"
              onChangeText={work_name => this.setState({ work_name })}
              style={{ padding:10 }}
            />
            <Mytext text="Select work date" />
             <DatePicker 
          style={{width: 200,marginLeft:80,marginTop:20}}
          date={this.state.work_date}
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="YYYY-M-D"
          minDate={new Date()}
           maxDate="2050-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(work_date) => {this.setState({work_date: work_date})}}
        />
       
       <Mytext text="Select reminder date" />
             <DatePicker
          style={{width: 200,marginLeft:80,marginTop:20}}
          date={this.state.rem_date}
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="YYYY-M-D 08:00"
          minDate={new Date()}
          maxDate="2050-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(rem_date) => {this.setState({rem_date: rem_date})}}
        />
       
            <Mybutton
              title="Submit"
              customClick={this.add_work.bind(this)}
            />
            <Text></Text>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}