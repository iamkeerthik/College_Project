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
      work_id:[],
      input_work_id: '',
      work_name: '',
      work_date: '',
      rem_date: '',
    };
    db.transaction(tx => {
      tx.executeSql('SELECT work_id FROM work', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log(temp)
        }
        this.setState({
          work_id: temp,
        });
        
      });
    });
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
  searchWork = () => {
    const {input_work_id} =this.state;
    console.log(this.state.input_work_id);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM work where work_id = ?',
        [input_work_id],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len',len);
          if (len > 0) {
            console.log(results.rows.item(0).work_name);
            this.setState({
             work_name:results.rows.item(0).work_name,
            });
            this.setState({
             work_date:results.rows.item(0).work_date,
            });
            this.setState({
             rem_date:results.rows.item(0).rem_date,
            });
          }else{
            alert('No work selected');
            this.setState({
              work_name:'',
              work_date:'',
              rem_date:'',
            });
          }
        }
      );
    });
  };
  UpdateWork = () => {
    var that=this;
    const { input_work_id } = this.state;
    const { work_name } = this.state;
    const { work_date } = this.state;
    const { rem_date } = this.state;
    if (work_name){
      if (work_date){
        if (rem_date){
          db.transaction((tx)=> {
            tx.executeSql(
              'UPDATE work set work_name=?, work_date=? , rem_date=? where work_id=?',
              [work_name, work_date, rem_date, input_work_id],
              (tx, results) => {
                console.log('Results',results.rowsAffected);
                if(results.rowsAffected>0){
                  Alert.alert(
                    'Updated',
                    'Work Updated Successfully,do you want to set reminder again ?',

                    [
                      {text: 'No', onPress: () => that.props.navigation.navigate('Work')},
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
        alert('Please fill work date');
      }
    }else{
      alert('Please fill work Name');
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
             
             <Dropdown label='Choose work Id'
             data={this.state.work_id} 
             valueExtractor={({ work_id }) => work_id}
             onChangeText={(input_work_id) => {this.setState({input_work_id })}}
             baseColor="black"
            
             /></View>
       </View>
            <Mybutton
              title="Search work"
              customClick={this.searchWork.bind(this)}
            />
            <Mytextinput
              placeholder="Enter Name"
              value={this.state.work_name}
              style={{ padding:10 }}
              onChangeText={work_name => this.setState({ work_name })}
            />
             <Mytext text="Select work date" />
             <DatePicker 
          style={{width: 200,marginLeft:80,marginTop:20}}
          date={this.state.work_date}
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
          onDateChange={(work_date) => {this.setState({work_date: work_date})}}
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
              title="Update work"
              customClick={this.UpdateWork.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
