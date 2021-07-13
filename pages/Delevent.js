
import React from 'react';
import { Button, Text, View, Alert,alertMessage } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {Dropdown} from 'react-native-material-dropdown';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
export default class Deleteevent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_event_id: '',
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
  RUsure=()=>{
    var that = this;
    const { input_event_id } = this.state;
    if(input_event_id)
    {
      Alert.alert(
        'Are you sure ?',
        alertMessage,
        [
          {text: 'No'},
          {text: 'Yes', onPress: () => this.deleteevent()} 
        ]
        );
    }
   else{
    alert('Please select event Id');
   } 
  }
  deleteevent = () => {
    var that = this;
    const { input_event_id } = this.state;
    db.transaction(tx => {
      tx.executeSql(
        'DELETE  FROM  event where event_id=?',
        [input_event_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'event deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => that.props.navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } 
        }
      );
    });
  };
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
       <View style={{marginTop:100}}>
          <View style={{marginLeft:50,marginRight:50,marginBottom:30,marginTop:40,}}>
             
             <Dropdown label='Choose event Id'
             data={this.state.event_id} 
             valueExtractor={({ event_id }) => event_id}
             onChangeText={(input_event_id) => {this.setState({input_event_id })}}
             baseColor="black"
             
             /></View>
       </View>
        <Mybutton
          title="Delete event"
          customClick={this.RUsure.bind(this)}
        />
        
      </View>
    );
  }
}