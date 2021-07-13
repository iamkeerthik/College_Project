import React, { Component } from 'react';
import { View, Text,TouchableOpacity,StyleSheet,FlatList } from 'react-native';
import {FAB} from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { openDatabase } from 'react-native-sqlite-storage';
import { ScrollView } from 'react-native-gesture-handler';
var db = openDatabase({ name: 'UserDatabase.db' }); 

export default class worker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
      isFetching: false,
      work_id:''
    };
  }
  componentWillMount()
  {

      this.fetch_event()
  }

  onRefresh() {
      this.setState({ isFetching: true }, function() { this.fetch_event() });
   }
fetch_event=()=>{
  let  work_id= this.props.navigation.getParam('work_id','Nothing sent');
  console.log(work_id)
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM workerequest where work_id= ?', [work_id], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
          isFetching: false
        });
      });
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 1, width: '0%', backgroundColor: '#808080' }} />
    );
  };

  render() {
    console.disableYellowBox="false"
    return (
      
      <View style={{flex: 1,}} >  
       <FlatList
          data={this.state.FlatListItems}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.work_id} style={{ backgroundColor: 'white', padding: 20,borderRadius:10,margin:10,elevation:10,borderWidth:0.5,borderColor:"black",marginBottom:2 }}>
                
              <Text>work_id: {item.work_id}</Text>
              <Text>Name: {item.worker_name}</Text>
              <Text>Contact: {item.c_no}</Text>       
            </View>
          )}
        />
         
        </View>
    );
  }
}
const styles=StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});