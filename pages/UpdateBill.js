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
 
export default class UpdateWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bill_id:[],
      input_bill_id: '',
      bill_type: '',
      due_date: '',
      rem_date: '',
    };
    db.transaction(tx => {
      tx.executeSql('SELECT bill_id FROM bill', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log(temp)
        }
        this.setState({
          bill_id: temp,
        });
        
      });
    });
  }
  add_rem = () => {
   
    var that = this;
    const { bill_type } = this.state;
    const { rem_date } = this.state;
    const {due_date}=this.state;
   
    SendIntentAndroid.addCalendarEvent({
      title:bill_type,
      description: `You have work on ${due_date}.`,
      startDate:rem_date,
      endDate:rem_date,
      recurrence: "Does not repeat",
      location: "The Home",
    
    });
  };
  searchWork = () => {
    const {input_bill_id} =this.state;
    console.log(this.state.input_work_id);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM bill where bill_id = ?',
        [input_bill_id],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len',len);
          if (len > 0) {
            console.log(results.rows.item(0).bill_id);
            this.setState({
             bill_type:results.rows.item(0).bill_type,
            });
            this.setState({
             due_date:results.rows.item(0).due_date,
            });
            this.setState({
             rem_date:results.rows.item(0).rem_date,
            });
          }else{
            alert('Please select payment id');
            this.setState({
              bill_type:'',
              due_date:'',
              rem_date:'',
            });
          }
        }
      );
    });
  };
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
  UpdateWork = () => {
    var that=this;
    const { input_bill_id } = this.state;
    const { bill_type } = this.state;
    const { due_date } = this.state;
    const { rem_date } = this.state;
    if (bill_type){
      if (due_date){
        if (rem_date){
          db.transaction((tx)=> {
            tx.executeSql(
              'UPDATE bill set bill_type=?, due_date=? , rem_date=? where bill_id=?',
               [bill_type, due_date, rem_date, input_bill_id],
              (tx, results) => {
                console.log('Results',results.rowsAffected);
                if(results.rowsAffected>0){
                  Alert.alert(
                    'Updated',
                    'Payment Updated Successfully,do you want to set reminder again ?',

                    [
                      {text: 'No', onPress: () => that.props.navigation.navigate('Bill')},
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
          alert('Please select remainder date');
        }
      }else{
        alert('Please select due date');
      }
    }else{
      alert('Please fill bill Type');
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
          <View style={{marginLeft:50,marginRight:50,marginBottom:20,marginTop:5,}}>
             
             <Dropdown label='Choose Payment Id'
             data={this.state.bill_id} 
             valueExtractor={({ bill_id }) =>bill_id}
             onChangeText={(input_bill_id) => {this.setState({input_bill_id })}}
             baseColor="black"
            
             /></View>
       </View>
            <Mybutton
              title="Search Payments"
              customClick={this.searchWork.bind(this)}
            />
            <Mytextinput
              placeholder="Bill type"
              value={this.state.bill_type}
              style={{ padding:10 }}
              onChangeText={bill_type => this.setState({ bill_type })}
            />
             <Mytext text="Select due date" />
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
              title="Update Payments"
              customClick={this.UpdateWork.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

              
             