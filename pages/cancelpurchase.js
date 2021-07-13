
import React from 'react';
import { Button, Text, View, Alert,alertMessage } from 'react-native';
import Mybutton from './components/Mybutton';
import {Dropdown} from 'react-native-material-dropdown';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
export default class DeletePurchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_purch_id: '',
      purch_id:[],
      Vdate:'',
      v_no:''
    };
    db.transaction(tx => {
      tx.executeSql('SELECT purch_id FROM purchase', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log(temp)
        }
        this.setState({
          purch_id: temp,
        });
        
      });
    });
  }
  fetch=()=>{
    const {input_purch_id}=this.state;
  db.transaction(tx => {
      tx.executeSql('SELECT c_no FROM purchase where purch_id=?', [input_purch_id], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log(temp)
        }
        this.setState({
          v_no: temp[0].c_no,
        });
        
      });
    });
    db.transaction(tx => {
      tx.executeSql('SELECT ddate FROM purchase where purch_id=?', [input_purch_id], (tx, results) => {
        var temp1 = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp1.push(results.rows.item(i));
          console.log(temp1)
        }
        this.setState({
          Vdate: temp1[0].ddate,
        });
        
      });
    });
}
  RUsure=()=>{
    
    const { input_purch_id } = this.state;
    if(input_purch_id)
    {
      Alert.alert(
        'Are you sure ?',
        alertMessage,
        [
          {text: 'No'},
          {text: 'Yes', onPress: () => this.deletepurchase()} 
        ]
        );
    }
   else{
    alert('Please select Purchase Id');
   } 
  }
  deletepurchase = () => {
    var that = this;

    const { input_purch_id } = this.state;
    db.transaction(tx => {
      tx.executeSql(
        'DELETE  FROM  purchase where purch_id=?',
        [input_purch_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Purchase cancelled successfully',
              [
                {
                  text: 'Ok',
                  onPress: () =>
                 that.props.navigation.navigate('Cancelpurchmsg',{v_no: that.state.v_no,Vdate:that.state.Vdate} )
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
             
             <Dropdown label='Choose Purchase Id'
             data={this.state.purch_id} 
             valueExtractor={({ purch_id }) => purch_id}
             onChangeText={(input_purch_id) => {this.setState({input_purch_id });this.fetch();}}
             baseColor="black"
             
             /></View>
       </View>
        <Mybutton
          title="Cancel Purchase"
          customClick={this.RUsure.bind(this)}
        />
        
      </View>
    );
  }
}