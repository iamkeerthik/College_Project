
import React from 'react';
import { Button, Text, View, Alert,alertMessage } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {Dropdown} from 'react-native-material-dropdown';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
export default class Deletebooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_vehicle_id: '',
      vehicle_id:[],
      
    };
    db.transaction(tx => {
      tx.executeSql('SELECT rq_id FROM vehicle', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log(temp)
        }
        this.setState({
          vehicle_id: temp,
        });
        
      });
    });
  }
  RUsure=()=>{
    var that = this;
    const { input_vehicle_id } = this.state;
    if(input_vehicle_id)
    {
      Alert.alert(
        'Are you sure ?',
        alertMessage,
        [
          {text: 'No'},
          {text: 'Yes', onPress: () => this.deletebooking()} 
        ]
        );
    }
   else{
    alert('Please select Booking Id');
   } 
  }
  deletebooking = () => {
    var that = this;
    const { input_vehicle_id } = this.state;
    db.transaction(tx => {
      tx.executeSql(
        'DELETE  FROM  vehicle where rq_id=?',
        [input_vehicle_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'booking deleted successfully',
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
             
             <Dropdown label='Choose booking Id'
             data={this.state.vehicle_id} 
             valueExtractor={({ rq_id }) => rq_id}
             onChangeText={(input_vehicle_id) => {this.setState({input_vehicle_id })}}
             baseColor="black"
             
             /></View>
       </View>
        <Mybutton
          title="Delete booking"
          customClick={this.RUsure.bind(this)}
        />
        
      </View>
    );
  }
}