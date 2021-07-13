/*Screen to update the user*/
import React from 'react';
import { View, YellowBox, ScrollView, KeyboardAvoidingView, Alert, } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import DatePicker from 'react-native-datepicker';
import {Dropdown} from 'react-native-material-dropdown';
var SendIntentAndroid = require("react-native-send-intent");
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
 
export default class Updateevent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_event_id: '',
      event_name: '',
      event_date: '',
      rem_date: '',
      event_id:[],
    };
    db.transaction(tx => {
      tx.executeSql('SELECT event_id FROM event', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log(temp)
        }
        this.setState({
          event_id: temp,
        });
        
      });
    });
  }
  searchevent = () => {
    const {input_event_id} =this.state;
    console.log(this.state.input_event_id);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM event where event_id = ?',
        [input_event_id],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len',len);
          if (len > 0) {
            console.log(results.rows.item(0).event_name);
            this.setState({
             event_name:results.rows.item(0).event_name,
            });
            this.setState({
             event_date:results.rows.item(0).event_date,
            });
            this.setState({
             rem_date:results.rows.item(0).rem_date,
            });
          }else{
            alert('No event selected');
            this.setState({
              event_name:'',
              event_date:'',
              rem_date:'',
            });
          }
        }
      );
    });
  };
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
  Updateevent = () => {
    var that=this;
    const { input_event_id } = this.state;
    const { event_name } = this.state;
    const { event_date } = this.state;
    const { rem_date } = this.state;
    if (event_name){
      if (event_date){
        if (rem_date){
          db.transaction((tx)=> {
            tx.executeSql(
              'UPDATE event set event_name=?, event_date=? , rem_date=? where event_id=?',
              [event_name, event_date, rem_date, input_event_id],
              (tx, results) => {
                console.log('Results',results.rowsAffected);
                if(results.rowsAffected>0){
                  Alert.alert(
                    'Updated',
                    'Event Updated Successfully,do you want to set reminder again ?',

                    [
                      {text: 'No', onPress: () => that.props.navigation.navigate('Event')},
                      {
                        text: 'Yes',    
                      onPress:(that.add_rem)}
                    ],
                    { cancelable: false }
                  );
                }else{
                  alert('Updation Failed');
                }
              }
            );
          });
        }else{
          alert('Please fill remainder date');
        }
      }else{
        alert('Please fill event date');
      }
    }else{
      alert('Please fill event Name');
    }
  };
 
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
             <View style={{marginTop:20}}>
          <View style={{marginLeft:50,marginRight:50,marginBottom:30,marginTop:1,}}>  
             <Dropdown label='Choose event Id'
             data={this.state.event_id} 
             valueExtractor={({ event_id }) => event_id}
             onChangeText={(input_event_id) => {this.setState({input_event_id })}}
             baseColor="black"
             
             /></View>
       </View>
            <Mybutton
              title="Search event"
              customClick={this.searchevent.bind(this)}
            />
            <Mytextinput
              placeholder="Enter Name"
              value={this.state.event_name}
              style={{ padding:10 }}
              onChangeText={event_name => this.setState({ event_name })}
            />
             <Mytext text="Select work date" />
             <DatePicker 
          style={{width: 200,marginLeft:80,marginTop:20}}
          date={this.state.event_date}
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
          onDateChange={(event_date) => {this.setState({event_date: event_date})}}
        />
       
       <Mytext text="Select reminder date" />
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
              title="Update Event"
              customClick={this.Updateevent.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
