import React, { Component } from 'react';
import { View, Text,TouchableOpacity,StyleSheet,FlatList } from 'react-native';
import {FAB} from 'react-native-paper';
var db = openDatabase({ name: 'UserDatabase.db' }); 
import { openDatabase } from 'react-native-sqlite-storage';
import { ScrollView } from 'react-native-gesture-handler';

export default class Vcontact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM contacts', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
    );
  };

  render() {
    return (
        
      <View>
      <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.work_id} style={{ backgroundColor: 'white', padding: 20 }}>
                
              <Text>name: {item.name}</Text>
              <Text>Number: {item.c_no}</Text>
              <Text>Type: {item.value}</Text>
              
            </View>
          )}
        />
      {/* <FAB
      style={Style.fab}
      icon="plus"
      onPress={()=>{this.props.navigation.navigate("Addwork")}}
      /> */}
       
        </View>
    );
  }
}
const Style=StyleSheet.create({
  fab:{
    position:'absolute',
    margin:20,
    right:30,
    bottom:100,
    backgroundColor:"red",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});