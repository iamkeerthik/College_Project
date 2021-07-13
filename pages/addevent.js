/*Screen to register the user*/
import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert,Text } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import DatePicker from 'react-native-datepicker';
import { openDatabase } from 'react-native-sqlite-storage';
var SendIntentAndroid = require("react-native-send-intent");
var db = openDatabase({ name: 'UserDatabase.db' });
export default class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event_name: '',
      discription:'',
      event_date: '',
      event_date: '',
    };
  }
  add_rem = () => {
    this.props.navigation.navigate('Event')
    var that = this;
    const { event_name } = this.state;
    const {event_date}=this.state;
    const { rem_date } = this.state;
    var date = new Date()//return today    
    console.log(date) 
    const TodayDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
    SendIntentAndroid.addCalendarEvent({
      title:event_name,
      description: `You have event on ${event_date}.`,
      startDate:rem_date,
      endDate:rem_date,
      recurrence: "Does not repeat",
      location: "The Home",
    });
  };
  add_event = () => {
    var that = this;
    const { event_name } = this.state;
    const { discription } = this.state;
    const { event_date } = this.state;
    const { rem_date } = this.state;
    //alert(user_name, user_contact, user_address);
    if (event_name) {
     if (discription) {
      if ( event_date) {
        if (rem_date) {
          db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO event (event_name, discription, event_date, rem_date) VALUES (?,?,?,?)',
              [event_name, discription, event_date, rem_date],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'Event added Successfully',
                    [
                      {
                        text: 'Ok',
                        onPress:(that.add_rem)
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Adding Event Failed');
                }
              }
            );
          });
        } else {
          alert('Please select event date');
        }
      } else {
        alert('Please select reminder date');
      }
    } else {
      alert('Please Enter Discription');
    }
  }else {
      alert('Please fill event Name');
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
              placeholder="Enter event Name"
              onChangeText={event_name => this.setState({ event_name })}
              style={{ padding:10 }}
            />
              <Mytextinput
              placeholder="Description"
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              onChangeText={discription => this.setState({ discription })}
              style={{textAlignVertical : 'top', padding:10}}
            />
            <Mytext text="Select Event date" />
             <DatePicker
          style={{width: 200,marginLeft:80,marginTop:20}}
          date={this.state.event_date}
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
          onDateChange={(event_date) => {this.setState({event_date: event_date})}}
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
              customClick={this.add_event.bind(this)}
            />
            <Text></Text>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}