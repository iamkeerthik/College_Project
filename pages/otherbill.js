/*Screen to register the user*/
import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import DatePicker from 'react-native-datepicker';
import { openDatabase } from 'react-native-sqlite-storage';
var SendIntentAndroid = require("react-native-send-intent");
var db = openDatabase({ name: 'UserDatabase.db' });
export default class Addbill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bill_type: '',
      due_date: '',
      rem_date: '',
    };
  }
  add_rem = () => {
    this.props.navigation.navigate('Bill')
    var that = this;
    const { bill_type } = this.state;
    const { rem_date } = this.state;
    const {due_date}=this.state;
    var date = new Date()//return today    
    console.log(date) 
    const TodayDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
    SendIntentAndroid.addCalendarEvent({
      title:bill_type,
      description: `You need to pay ${bill_type} before ${due_date}.`,
      startDate:TodayDate,
      endDate:rem_date,
      recurrence: "Does not repeat",
      location: "",
      
    });
  };
  add_bill = () => {
    var that = this;
    const { bill_type } = this.state;
    const { due_date } = this.state;
    const { rem_date } = this.state;
  
    if (bill_type) {
      if ( due_date) {
        if (rem_date) {
          db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO bill(bill_type, due_date, rem_date) VALUES (?,?,?)',
              [bill_type, due_date, rem_date],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'Bill added Successfully',
                    [
                      {
                        text: 'Ok',
                        onPress:(that.add_rem)
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Failed add Bill');
                }
              }
            );
          });
        } else {
          alert('Please select Reminder date');
        }
      } else {
        alert('Please select Due date');
      }
    } else {
      alert('Please fill Bill Type');
    }
  };
  render() {
    console.disableYellowBox="false"
     return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Enter Bill type"
              onChangeText={bill_type => this.setState({ bill_type })}
              style={{ padding:10 }}
            />
            <Mytext text="Select Due date" />
             <DatePicker 
          style={{width: 200,marginLeft:80,marginTop:20}}
          date={this.state.due_date}
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="YYYY-MM-DD"
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
          onDateChange={(due_date) => {this.setState({due_date: due_date})}}
        />
       
       <Mytext text="Select Remainder date" />
             <DatePicker
          style={{width: 200,marginLeft:80,marginTop:20}}
          date={this.state.rem_date}
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="YYYY-MM-DD 08:00"
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
              customClick={this.add_bill.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}