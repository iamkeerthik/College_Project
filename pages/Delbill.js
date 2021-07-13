
import React from 'react';
import { Button, Text, View, Alert,alertMessage } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {Dropdown} from 'react-native-material-dropdown';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
export default class DeletePayments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_bill_id: '',
      bill_id:[],
      
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
  RUsure=()=>{
    var that = this;
    const { input_bill_id } = this.state;
    if(input_bill_id)
    {
      Alert.alert(
        'Are you sure ?',
        alertMessage,
        [
          {text: 'No'},
          {text: 'Yes', onPress: () => this.DeletePayments()} 
        ]
        );
    }
   else{
    alert('Please select Payment Id');
   } 
  }
  DeletePayments = () => {
    var that = this;
    const { input_bill_id } = this.state;
    db.transaction(tx => {
      tx.executeSql(
        'DELETE  FROM  bill where bill_id=?',
        [input_bill_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Payment deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => that.props.navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please select Payment Id');
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
             
             <Dropdown label='Choose Payment Id'
             data={this.state.bill_id} 
             valueExtractor={({ bill_id }) => bill_id}
             onChangeText={(input_bill_id) => {this.setState({input_bill_id })}}
             baseColor="black"
             
             /></View>
       </View>
        <Mybutton
          title="Delete"
          customClick={this.RUsure.bind(this)}
        />
        
      </View>
    );
  }
}