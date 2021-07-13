
          import React from 'react';
          import { View, ScrollView, KeyboardAvoidingView, Alert,ToastAndroid } from 'react-native';
          import Mytextinput from './components/Mytextinput';
          import Mybutton from './components/Mybutton';
          import {RadioButton,Text,} from 'react-native-paper';
          import { openDatabase } from 'react-native-sqlite-storage';
          var db = openDatabase({ name: 'UserDatabase.db' });
          export default class contacts extends React.Component {
            constructor(props) {
              super(props);
              this.state = {
                name: '',
                c_no: '',
                value: 'Worker',
              };
            }
            clear_Fields = () => {
              this.setState({
                name: "",
                c_no:"",
                value: 'Worker',
              })
            }
            add_contact = () => {
              var that = this;
              const { name } = this.state;
              const { c_no } = this.state;
              const { value } = this.state;
              //alert(user_name, user_contact, user_address);
          if (name) {
            if(name.length < 15){
              if ( c_no) {
                if(!(isNaN(c_no))){
                if(c_no.length == 10) {
                    if (value) {
                      db.transaction(tx => {
                        tx.executeSql(
                          'SELECT * FROM contacts where name = ?',
                          [name],
                          (tx, results) => {
                            var len = results.rows.length;
                            console.log('len', len);
                            if (len > 0) {
                                //function to make Toast With Duration
                                ToastAndroid.showWithGravity('Name must be unique', ToastAndroid.SHORT,ToastAndroid.CENTER);
                            }
                            else {
                              db.transaction(tx => {
                                tx.executeSql(
                                  'SELECT * FROM contacts where c_no = ?',
                                  [c_no],
                                  (tx, results) => {
                                    var len = results.rows.length;
                                    console.log('len', len);
                                    if (len > 0) {
                                        //function to make Toast With Duration
                                        ToastAndroid.showWithGravity('Contact number already exist', ToastAndroid.SHORT,ToastAndroid.CENTER);
                                    }
                                    else {
                                      db.transaction(function(tx) {
                                        tx.executeSql(
                                          'INSERT INTO contacts (name, c_no, value) VALUES (?,?,?)',
                                          [name, c_no, value],
                                          (tx, results) => {
                                            console.log('Results', results.rowsAffected);
                                            if (results.rowsAffected > 0) {
                                              Alert.alert(
                                                'Success',
                                                'contact added Successfully',
                                                [
                                                  {
                                                    text: 'Ok',
                                                    onPress:(that.clear_Fields)
                                                  },
                                                ],
                                                { cancelable: false }
                                              );
                                            } else {
                                              alert('Failed add contact');
                                            }
                                          }
                                        );
                                      });
        
                                          }
                                }
                               );
                            });
                                  }
                        }
                       );
                    });
                  } else {
                    alert('Please select type');
                  }
                } else {
                  ToastAndroid.showWithGravity('Contact number must be 10 digits', ToastAndroid.SHORT,ToastAndroid.CENTER);
                }
              } else {
                ToastAndroid.showWithGravity('Contact no is not a number', ToastAndroid.SHORT,ToastAndroid.CENTER);
              }
            } else {
              alert('Please insert mobile number');
            }
         } else {
          ToastAndroid.showWithGravity('Only 15 charecters are allowed for name', ToastAndroid.SHORT,ToastAndroid.CENTER);
         }
       } else {
          alert('Please fill name');
       }
    };
            render() {
              console.disableYellowBox="true"
              return (
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                  <ScrollView keyboardShouldPersistTaps="handled">
                    <KeyboardAvoidingView
                      behavior="padding"
                      style={{ flex: 1, justifyContent: 'space-between' }}>
                      <Mytextinput
                        placeholder="Enter Name"
                        value={this.state.name} 
                        autoCorrect={false}
                        maxLength={15}
                        onChangeText={name => this.setState({ name })}
                        style={{ padding:10 }}
                      />
                        <Mytextinput
                        placeholder="Enter Contact No"
                        value={this.state.c_no} 
                        onChangeText={c_no => this.setState({ c_no })}
                        maxLength={10}
                        keyboardType="numeric"
                        style={{ padding:10 }}
                      />
              </KeyboardAvoidingView>
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
                        title="Submit"
                        customClick={this.add_contact.bind(this)}
                      />
                    
                      <Text></Text>
                  </ScrollView>

                </View>
              );
            }
          }