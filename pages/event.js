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

      this.fetch_event()
  }

  onRefresh() {
      this.setState({ isFetching: true }, function() { this.fetch_event() });
   }
fetch_event=()=>{
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM event', [], (tx, results) => {
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
      <View style={{ height:1, width: '100%', backgroundColor: '#808080' }} />
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
            <View key={item.event_id} style={{ backgroundColor: 'white', padding: 20,borderRadius:10,margin:10,elevation:10,borderWidth:0.5,borderColor:"black",marginBottom:2 }}>
                
              <Text>Id: {item.event_id}</Text>
              <Text>Name: {item.event_name}</Text>
              <Text>Date: {item.event_date}</Text>
              <Text>Rem_Date: {item.rem_date}</Text>
              <TouchableOpacity style={{marginTop:10,marginRight:220,backgroundColor:"red",padding:1,alignItems:"center",elevation:8,borderRadius:10}} onPress={() => this.props.navigation.navigate('Invite_sent',{event_id: item.event_id})}>
                <Text style={{color:"white",fontWeight:"bold",fontSize:15}}>More</Text>

                </TouchableOpacity>
            </View>
          )}
        />
        
        <ActionButton buttonColor="rgba(231,76,60,1)" style={{position:'absolute',marginBottom:40}} >
        <ActionButton.Item
        buttonColor="#3498db"
        title="Invites"
        onPress={()=>{this.props.navigation.navigate("Invites")}}>
        <Icon name="md-send" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#3498db"
        title="Update"
        onPress={()=>{this.props.navigation.navigate("Updateevent")}}>
        <Icon name="md-star" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#1abc9c"
        title="Delete"
        onPress={()=>{this.props.navigation.navigate("Delevent")}}>
        <Icon name="md-remove" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="red"
        title="Add"
        onPress={()=>{this.props.navigation.navigate("Addevent")}}>
        <Icon name="md-add" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
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