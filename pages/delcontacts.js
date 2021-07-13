/*Screen to delete the user*/
import React from 'react';
import { Button, Text, View, Alert,ToastAndroid,alertMessage } from 'react-native';
import Mytextinput from './components/Mytextinput';
import {Dropdown} from 'react-native-material-dropdown';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
export default class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_c_no: '',
      name:[],
      c_no:''
    };
    db.transaction(tx => {
      tx.executeSql('SELECT name FROM contacts', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log(temp)
        }
        this.setState({
          name: temp,
        });
        
      });
    });
  }
  searchcont = () => {
    const {input_c_no} =this.state;
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM contacts where name = ?',
        [input_c_no],
        (tx, results) => {
          var temp=[];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            console.log(temp)
          }
          this.setState({
            c_no:temp[0].c_no,
            
          });
        }
      );
    });
  };
  RUsure=()=>{
    var that = this;
    const { c_no } = this.state;
    if(c_no)
    {
      Alert.alert(
        'Are you sure ?',
        alertMessage,
        [
          {text: 'No'},
          {text: 'Yes', onPress: () => this.deletecont()} 
        ]
        );
    }
   else{
    alert('Please select Contact');
   } 
  }
  deletecont = () => {
    var that = this;
    const { c_no } = this.state;
    db.transaction(tx => {
      tx.executeSql(
        'DELETE  FROM  contacts where c_no=?',
        [c_no],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Contact deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => that.props.navigation.navigate('Contact'),
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
             
             <Dropdown label='Choose Contact'
             data={this.state.name} 
             valueExtractor={({ name }) => name}
             onChangeText={(input_c_no) => {this.setState({input_c_no });this.searchcont()}}
             baseColor="black"
             
             /></View>
       </View>
        <Mybutton
          title="Delete Contact"
          customClick={this.RUsure.bind(this)}
        />
       
      </View>
    );
  }
}