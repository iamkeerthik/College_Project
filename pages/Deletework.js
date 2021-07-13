
import React from 'react';
import { Button, Text, View, Alert,alertMessage } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {Dropdown} from 'react-native-material-dropdown';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
export default class DeleteUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_work_id: '',
      work_id:[],
      
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
  RUsure=()=>{
    var that = this;
    const { input_work_id } = this.state;
    if(input_work_id)
    {
      Alert.alert(
        'Are you sure ?',
        alertMessage,
        [
          {text: 'No'},
          {text: 'Yes', onPress: () => this.deletework()} 
        ]
        );
    }
   else{
    alert('Please select work Id');
   } 
  }
  deletework = () => {
    var that = this;
    const { input_work_id } = this.state;
    db.transaction(tx => {
      tx.executeSql(
        'DELETE  FROM  work where work_id=?',
        [input_work_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Work deleted successfully',
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
             
             <Dropdown label='Choose work Id'
             data={this.state.work_id} 
             valueExtractor={({ work_id }) => work_id}
             onChangeText={(input_work_id) => {this.setState({input_work_id })}}
             baseColor="black"
            
             /></View>
       </View>
        <Mybutton
          title="Delete work"
          customClick={this.RUsure.bind(this)}
        />
        
      </View>
    );
  }
}