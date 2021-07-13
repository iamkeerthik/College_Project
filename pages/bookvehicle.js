/*Screen to register the user*/
import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert,Button } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
import {RadioButton,Text,} from 'react-native-paper'
import DatePicker from 'react-native-datepicker';
import {Dropdown} from 'react-native-material-dropdown';
import MultiSelect from 'react-native-multiple-select';
var db = openDatabase({ name: 'UserDatabase.db' });
export default class BookVehicle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        name:[],
        Vdate:'',
        nm:'',
        v_no:'', 
        event_name:[],
        selected_event:''
    };
    
    db.transaction(tx => {
      tx.executeSql('SELECT name FROM contacts where value="Vehicle"', [], (tx, results) => {
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
    db.transaction(tx => {
      tx.executeSql('SELECT event_name FROM event', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log(temp)
        }
        this.setState({
          event_name: temp,
        });
        
      });
    });
  }
  fetch=()=>{
    const {nm}=this.state;
    db.transaction(tx => {
      tx.executeSql(`SELECT c_no FROM contacts where name="${nm}"`, [], (tx, results) => {
        var temp2 = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp2.push(results.rows.item(i));
           console.log(temp2[0].c_no)
        }
        this.setState({
          v_no:temp2[0].c_no,
        });
        
      });
    }); 
   }
  book_Vehicle = () => {
    var that = this;
    const { nm } = this.state;
    const { Vdate } = this.state;
    const {v_no}=this.state;
    const {selected_event}=this.state;
    console.log(selected_event)
    if (nm) {
      if (selected_event) {
        if(Vdate) {
          db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO vehicle (evnt_name,name,c_no,vdate) VALUES (?,?,?,?)',
              [selected_event,nm,v_no, Vdate],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'vehicle booking added Successfully',

                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                          that.props.navigation.navigate('BookVehicle',{v_no: that.state.v_no,Vdate:that.state.Vdate} )
                      },  
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Failed add vehicle');
                }
              }
            );
          });
        } else {
          alert('Please select date');
        }
      } else {
        alert('Please select Event');
      }
    } else {
      alert('Please select vehicle owner name ');
    }
  };
  render() {
   
     console.disableYellowBox="true"
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
      
            
            <View style={{marginLeft:50,marginRight:50,marginBottom:30,marginTop:20}}>
             
           <Dropdown label='Choose Vehicle'
           data={this.state.name} 
           valueExtractor={({ name }) => name}
           onChangeText={(nm) => {this.setState({nm: nm });this.fetch();}}
           baseColor="black"
           />
           </View>
           <View style={{marginLeft:50,marginRight:50,marginBottom:5,marginTop:2,}}>
             
             <Dropdown label='Choose event'
             data={this.state.event_name} 
             valueExtractor={({ event_name }) => event_name}
             onChangeText={(selected_event) => {this.setState({selected_event:selected_event})}}
             baseColor="black"
             
             /></View>
            <Mytext text="Select date" />
             <DatePicker 
          style={{width: 200,marginLeft:80,marginTop:20}}
          date={this.state.Vdate}
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
          onDateChange={(Vdate) => {this.setState({Vdate: Vdate})}}
        />
    
            <Mybutton
              title="Book Vehicle"
              customClick={this.book_Vehicle.bind(this)}
            /> 
            <Text></Text>
        
        
      </View>
    );
  }
}