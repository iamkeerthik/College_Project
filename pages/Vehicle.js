import React, { Component } from 'react';
import { View, Text,TouchableOpacity,StyleSheet,FlatList } from 'react-native';
import {FAB} from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { openDatabase } from 'react-native-sqlite-storage';
import { ScrollView } from 'react-native-gesture-handler';
var db = openDatabase({ name: 'UserDatabase.db' }); 
export default class work extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
      isFetching: false,
    };
  }
  componentWillMount()
  {

      this.fetch_work()
  }

  onRefresh() {
      this.setState({ isFetching: true }, function() { this.fetch_work() });
   }
fetch_work=()=>{
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM vehicle', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
          isFetching: false,
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
   
    console.disableYellowBox="false"
    return (
        
      <View style={{flex: 1,}}>
      <FlatList
          data={this.state.FlatListItems}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.rq_id} style={{ backgroundColor: 'white', padding: 20,borderRadius:10,margin:10,elevation:10,borderWidth:0.5,borderColor:"black",marginBottom:2 }}>
              <Text>Id: {item.rq_id}</Text>
              <Text>Event:{item.evnt_name}</Text>
              <Text>Vehicle Owner: {item.name}</Text>
          <Text>c_no:{item.c_no}</Text>
              <Text>Date: {item.vdate}</Text>
            </View>
          )}
          
        />
        
      <ActionButton buttonColor="rgba(231,76,60,1)" style={{position:'absolute',marginBottom:40}} >
      <ActionButton.Item
            buttonColor="#1abc9c"
            title="Cancel"
            onPress={()=>{this.props.navigation.navigate("Cancelvehicle")}}>
            <Icon name="md-x" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="Delete"
            onPress={()=>{this.props.navigation.navigate("DelVehicle")}}>
            <Icon name="md-remove" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="red"
            title="Add"
            onPress={()=>{this.props.navigation.navigate("Vehicle")}}>
            <Icon name="md-add" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton></View>
      
    );
  }
}
const styles=StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
    
  },
  circle: {
   
    borderRadius: 100,
    borderWidth:1,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'orange',
    padding:10,
    marginLeft:300,
    elevation:10,
    marginTop:405,
    
  }
});