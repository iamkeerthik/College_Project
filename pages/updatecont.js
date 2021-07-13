/*Screen to update the user*/
import React from 'react';
import { View, YellowBox, ScrollView, KeyboardAvoidingView, Alert,ToastAndroid } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {Dropdown} from 'react-native-material-dropdown';
import {RadioButton,Text,} from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
 
export default class Updatecont extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     name:'',
     c_no:'',
     value:'',
     c_name:[],
     input_name:'',

    };
    db.transaction(tx => {
      tx.executeSql('SELECT name FROM contacts', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log(temp)
        }
        this.setState({
          c_name: temp,
        });
        
      });
    });
  }
  searchcont = () => {
    const {input_name} =this.state;
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM contacts where name = ?',
        [input_name],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len',len);
          if (len > 0) {
            console.log(results.rows.item(0).name);
            this.setState({
             name:results.rows.item(0).name,
            });
            this.setState({
             c_no:results.rows.item(0).c_no,
            });
            this.setState({
             value:results.rows.item(0).value,
            });
          }else{
            alert('Please select contact name');
            this.setState({
              name:'',
              c_no:'',
              value:'',
            });
          }
        }
      );
    });
  };

  Updatecont = () => {
    var that=this;
    const {input_name}=this.state;
    const { name } = this.state;
    const { c_no } = this.state;
    const { value } = this.state;
    if (name){
      if (c_no){
        if (value){
          db.transaction((tx)=> {
            tx.executeSql(
              'UPDATE contacts set name=?, c_no=? , value=? where name=?',
              [name, c_no, value,input_name],
              (tx, results) => {
                console.log('Results',results.rowsAffected);
                if(results.rowsAffected>0){
                  if(results.rowsAffected>0){
                    Alert.alert( 'Success', 'contact updated successfully',
                      [
                        {text: 'Ok',
                        onPress: () => that.props.navigation.navigate('Contacts')
                      }
                      ],
                      { cancelable: false }
                    );
                  }
                }else{
                  alert('Updation Failed');
                }
              }
            );
          });
        }else{
          alert('Please select type');
        }
      }else{
        alert('Please fill contact number');
      }
    }else{
      alert('Please fill Name');
    }
  };
 
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
             <View style={{marginLeft:50,marginRight:50,marginBottom:20,marginTop:40,}}>
             
             <Dropdown label='Choose contact'
             data={this.state.c_name} 
             valueExtractor={({ name }) => name}
             onChangeText={(input_name) => {this.setState({input_name })}}
             baseColor="black"
            
             /></View>
            <Mybutton
              title="Search contact"
              customClick={this.searchcont.bind(this)}
            />
            <Mytextinput
              placeholder="Enter Name"
              value={this.state.name}
              style={{ padding:10 }}
              onChangeText={name => this.setState({ name })}
            />
            <Mytextinput
              placeholder="Enter contact no"
              value={''+ this.state.c_no}
              onChangeText={c_no => this.setState({ c_no })}
              maxLength={10}
              style={{ padding:10 }}
          
            />
             <RadioButton.Group 
        onValueChange={value => this.setState({ value })}
        value={this.state.value}
             >
            <View style={{marginTop:40,flexDirection:"column",marginLeft:10}}> 
            <Text style={{fontWeight:"bold",fontSize:15,marginRight:5,marginTop:-10,marginBottom:10}}>Contact Type</Text>
            <View style={{flexDirection:"row",marginLeft:25}}>
        <View style={{marginLeft:20,}}>
          <Text>Worker</Text>
          <RadioButton value="Worker"/>
        </View>
        <View style={{marginLeft: 20,}}>
          <Text>Relative</Text>
          <RadioButton value="Relative"/>
        </View>
        <View style={{marginLeft: 20,}}>
          <Text>Seller</Text>
          <RadioButton value="Seller"/>
        </View>
       <View style={{marginLeft: 20,}}>
            <Text>Vehicle</Text>
            <RadioButton value="Vehicle"/>
       </View>
       </View>
        </View>
      </RadioButton.Group>
            <Mybutton
              title="Update Contact"
              customClick={this.Updatecont.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
