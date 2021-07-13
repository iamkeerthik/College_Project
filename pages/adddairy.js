/*Screen to register the user*/
import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import DatePicker from 'react-native-datepicker';
import {RadioButton,Text,} from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage';
var SendIntentAndroid = require("react-native-send-intent");
var db = openDatabase({ name: 'UserDatabase.db' });
export default class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type:'Diary',
      entry: '',
      rem_date: '',
      fun_date:'',
      show:false
    };
  }
  
  add_rem = () => {
    this.props.navigation.navigate('Diary')
    var that = this;
    const { entry } = this.state;
    const { rem_date } = this.state;
    const {fun_date}=this.state;
    SendIntentAndroid.addCalendarEvent({
      title:entry,
      description: `You have Function on ${fun_date}.`,
      startDate:rem_date,
      endDate:rem_date,
      recurrence: "Does not repeat",
      location: "",
    
    });
  }
  ShowHideComponent = () => { 
    if (this.state.show == true) {
      this.setState({ show: false });
      this.setState({ type:"Diary" });
    } else {
      this.setState({ show: true });
      this.setState({ type:"Invitation" });
    }
  };


  add_diary = () => {
    if(this.state.type=='Invitation')
    {
    var that = this;
    const { type } = this.state;
    const { entry } = this.state;
    const {fun_date } = this.state;
    const {rem_date}=this.state;
    var date = new Date()//return today   
    var ddate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    console.log(ddate)
    if (type) {
      if ( entry) {
        if(fun_date)
        if (rem_date) {
          db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO diary (type, entry, expense, ddate, fun_date, rem_date) VALUES (?,?,?,?,?,?)',
              [type, entry,null,ddate,fun_date, rem_date],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'Invitation added Successfully,do you want to set reminder?',

                    [
                      {text: 'No', onPress: () => that.props.navigation.navigate('Diary')},
                      {
                        text: 'Yes',    
                      onPress:(that.add_rem)}
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Failed add entry');
                }
              }
            );
          });
        } else {
          alert('Please select reminder date');
        }else {
          alert('Please select Function date');
        }
      } else {
        alert('Please enter diary entry');
      }
    } else {
      alert('Please select Entry type');
    }
  }
  else
  {
    var that = this;
    const { type } = this.state;
    const { entry } = this.state;
    const {expense}=this.state;
    var date = new Date()//return today   
    var ddate2 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    console.log(ddate2)
    if (type) {
      if (entry) {
        if (expense) {
          db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO diary (type, entry, expense,ddate, fun_date, rem_date) VALUES (?,?,?,?,?,?)',
              [type, entry,expense,ddate2,null,null],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'Diary entry added Successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                          that.props.navigation.navigate('Homescreen'),
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Failed add entry');
                }
              }
            );
          });
        
      }else {
        alert('Please enter Expenses');
      }
    }else {
        alert('Please enter description');
      }
    } else {
      alert('Please select Entry type');
    }
  };

};
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        
          <RadioButton.Group 
        onValueChange={this.ShowHideComponent}
        value={this.state.type}
      >
            <View style={{marginTop:10,flexDirection:"row",marginLeft:20, backgroundColor:"lightyellow",marginRight:20,borderRadius:8,elevation:5}}> 
            <Text style={{fontWeight:"bold",fontSize:20,marginRight:10}}>      Entry type</Text>

        <View style={{marginLeft:20,}}>
          <Text>Diary</Text>
          <RadioButton value="Diary" color="black"/>
        </View>
        <View style={{marginLeft: 20,}}>
          <Text>Invitation</Text>
          <RadioButton value="Invitation" color="black" />
        </View>
        </View>
      </RadioButton.Group>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
             <Mytextinput
              placeholder="Enter Description"
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              onChangeText={entry => this.setState({ entry })}
              style={{textAlignVertical : 'top', padding:10}}
            />
     
       {this.state.show ? (
         <View>
           <View style={{flexDirection:"row",marginTop:20}}>
         <Text style={{paddingLeft:40,fontWeight:"bold",marginTop:10}}> Event date:</Text>
           <DatePicker
           style={{width: 200,marginLeft:15}}
           date={this.state.fun_date}
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
           onDateChange={(fun_date) => {this.setState({fun_date: fun_date})}}
         />
         </View>
         <View style={{flexDirection:"row",marginTop:20}}>
         <Text style={{paddingLeft:30,fontWeight:"bold",marginTop:10}}> Reminder date:</Text>
           <DatePicker
           style={{width: 200,}}
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
         </View>
       </View>
        ) : <Mytextinput
        placeholder="Daily expenses"
        maxLength={225}
        numberOfLines={5}
        multiline={true}
        onChangeText={expense => this.setState({ expense })}
        style={{textAlignVertical : 'top', padding:10}}
      />
      }
            
            <Mybutton
              title="Submit"
              customClick={this.add_diary.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
