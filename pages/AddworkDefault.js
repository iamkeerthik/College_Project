/*Screen to register the user*/
import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert,Text,TouchableOpacity,SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import DatePicker from 'react-native-datepicker';
import { openDatabase } from 'react-native-sqlite-storage';
import {Dropdown} from 'react-native-material-dropdown';
var db = openDatabase({ name: 'UserDatabase.db' });
var SendIntentAndroid = require("react-native-send-intent");
import MultiSelect from 'react-native-multiple-select';
export default class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      work_name: '',
      work_date: '',
      rem_date: '',
      worker:'',
      name:[],
    };
    
    db.transaction(tx => {
      tx.executeSql('SELECT name,c_no FROM contacts where value="Worker"', [], (tx, results) => {
        var temp=[];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log(temp)
        }
        this.setState({
          name:temp,
          
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
        alert('Please select Work Name');
      }
    };
   
  render() {
    const { selectedItems } = this.state;
      let data=[{
          value:'Carpenter',
      },
      {
          value:'Plumber',
      },
      {
          value:'Electrician'
      }
    ];
    console.disableYellowBox="true"
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
         <View style={{flexDirection:"row"}}>
           <View style={{marginLeft:30,marginRight:30,width:160}}>
           <Dropdown label='select work'
           data={data} 
           onChangeText={work_name => this.setState({ work_name })}
           /></View>
            <TouchableOpacity style={{margin:30,backgroundColor:"lightgreen",width:70,height:25,alignItems:"center",elevation:8}} onPress={() => this.props.navigation.navigate('Addwork')}>
                <Text style={{color:"white",fontWeight:"bold",fontSize:20}}>Others</Text>

                </TouchableOpacity>
            </View>
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
         
           
          </KeyboardAvoidingView>
          <Mybutton
              title="Submit"
              customClick={this.add_work.bind(this)}
            />
        </ScrollView>

      </View>
    );
  }
}