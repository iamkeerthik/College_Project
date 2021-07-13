import React, { Component } from 'react';
import { View,StyleSheet,FlatList,TouchableOpacity,Text,ScrollView} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
import {RadioButton} from 'react-native-paper';
var db = openDatabase({ name: 'UserDatabase.db' });
import Icon from 'react-native-vector-icons/Ionicons';
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
     Ddate:'',
     FlatListWorks: [],
     FlatListEvents: [],
     FlatListPurchases: [],
     FlatListBills: [],
     FlatListDiaries: [],
     FlatListVehicles: []
    };
  }
  search = () => {
    const {Ddate} =this.state;
    console.log(this.state.Ddate);
    if(Ddate){
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM work where work_date= ?',
        [Ddate], (tx, results) => {
         var len = results.rows.length;
         if (len > 0) {
          var temp1 = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp1.push(results.rows.item(i));
            console.log(temp1)
          }
          this.setState({
            FlatListWorks: temp1,
          }); 
        }
        else if(results.rows.length ==0){
            this.setState({
              FlatListWorks:''
            });
        }
       });
      });
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM event where  event_date= ?',
        [Ddate], (tx, results) => {
         var len = results.rows.length;
         if (len > 0) {
          var temp2 = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp2.push(results.rows.item(i));
            console.log(temp2)
          }
          this.setState({
            FlatListEvents: temp2,
          });
        } else if(results.rows.length ==0){
          this.setState({
            FlatListEvents:''
          });
      }
        });
      });
      
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM vehicle where vdate= ?',
        [Ddate], (tx, results) => {
         var len = results.rows.length;
         if (len > 0) {
          var temp3 = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp3.push(results.rows.item(i));
            console.log(temp3)
          }
          this.setState({
            FlatListVehicles: temp3,
          });
        }else if(results.rows.length ==0){
          this.setState({
            FlatListVehicles:''
          });
      }
        });
      });
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM purchase where ddate= ?',
        [Ddate], (tx, results) => {
         var len = results.rows.length;
         if (len > 0) {
          var temp4 = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp4.push(results.rows.item(i));
            console.log(temp4)
          }
          this.setState({
            FlatListPurchases: temp4,
          });
        }else if(results.rows.length ==0){
          this.setState({
            FlatListPurchases:''
          });
      }
        });
      });
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM bill where due_date= ?',
        [Ddate], (tx, results) => {
         var len = results.rows.length;
         if (len > 0) {
          var temp5 = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp5.push(results.rows.item(i));
            console.log(temp5)
          }
          this.setState({
            FlatListBills: temp5,
          });
        }else if(results.rows.length ==0){
          this.setState({
            FlatListBills:''
          });
      }
        });
      });
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM diary where ddate= ?',
        [Ddate], (tx, results) => {
         var len = results.rows.length;
         if (len > 0) {
          var temp6 = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp6.push(results.rows.item(i));
            console.log(temp6)
          }
          this.setState({
            FlatListDiaries: temp6,
          }); 
        }else if(results.rows.length ==0){
          this.setState({
            FlatListDiaries:''
          });
      }
       });
      });
    }else{
      alert("Please select date")
    }
    }
  
    ListViewItemSeparator = () => {
      return (
        <View style={{ height:1, width: '0%', backgroundColor: '#808080' }} />
      );
    };
          
  render() {
      console.disableYellowBox="true"
    
    return (
        
         <View>
        <ScrollView >
         <View style={{flexDirection:"row",backgroundColor:"grey",borderRadius:10,margin:8}}>

         <DatePicker 
          style={{width: 200,marginLeft:10,marginTop:10}}
          date={this.state.Ddate}
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="YYYY-M-D"
          minDate="2019-01-01"
          maxDate="2050-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(Ddate) => {this.setState({Ddate: Ddate})}}
        />
         <TouchableOpacity style={{margin:15,backgroundColor:"black",width:80,height:33,alignItems:"center",elevation:8,borderRadius:8}} onPress={this.search.bind(this)}>
              <Icon name="md-search" style={{fontSize:30,color:"white"}}
                  />
                </TouchableOpacity>
         </View>
             
        <View style={{flexDirection:"row"}} >  
        <FlatList
           data={this.state.FlatListWorks}
           ItemSeparatorComponent={this.ListViewItemSeparator}
           keyExtractor={(item, index) => index.toString()}
           renderItem={({ item }) => (
             <View key={item.work_id} style={{ backgroundColor: 'white', padding: 20,borderRadius:10,margin:10,elevation:10,borderWidth:0.5,borderColor:"black",marginBottom:2 }}>
                 
               <Text>Id: {item.work_id}</Text>
               <Text>Work_Name: {item.work_name}</Text>
               <Text>Rem_Date: {item.rem_date}</Text>
               <TouchableOpacity style={{marginTop:5,marginRight:220,backgroundColor:"red",padding:1,alignItems:"center",elevation:8,borderRadius:10}} onPress={() => this.props.navigation.navigate('Worker',{work_id: item.work_id})}>
                <Text style={{color:"white",fontWeight:"bold",fontSize:15}}>More</Text>
                </TouchableOpacity>
             </View>
           )}
         />
       </View>
       <View style={{flexDirection:"row"}} > 
        <FlatList
           data={this.state.FlatListEvents}
           ItemSeparatorComponent={this.ListViewItemSeparator}
           keyExtractor={(item, index) => index.toString()}
           renderItem={({ item }) => (
             <View key={item.event_id} style={{ backgroundColor: 'white', padding: 20,borderRadius:10,margin:10,elevation:10,borderWidth:0.5,borderColor:"black",marginBottom:2 }}> 
               <Text>Id: {item.event_id}</Text>
               <Text>Event_Name: {item.event_name}</Text>
               <Text>Rem_Date: {item.rem_date}</Text>  
               <TouchableOpacity style={{marginTop:10,marginRight:220,backgroundColor:"red",padding:1,alignItems:"center",elevation:8,borderRadius:10}} onPress={() => this.props.navigation.navigate('Invite_sent',{event_id: item.event_id})}>
                <Text style={{color:"white",fontWeight:"bold",fontSize:15}}>More</Text>
                </TouchableOpacity> 
             </View>
           )}
         />
       </View>
       <View style={{flexDirection:"row"}} >
        <FlatList
           data={this.state.FlatListVehicles}
           ItemSeparatorComponent={this.ListViewItemSeparator}
           keyExtractor={(item, index) => index.toString()}
           renderItem={({ item }) => (
             <View key={item.rq_id} style={{ backgroundColor: 'white', padding: 20,borderRadius:10,margin:10,elevation:10,borderWidth:0.5,borderColor:"black",marginBottom:2 }}>
                 
               <Text>Id: {item.rq_id}</Text>
               <Text>Name: {item.name}</Text>
               <Text>Date: {item.vdate}</Text> 
             </View>
           )}
         />
       </View>
       <View style={{flexDirection:"row"}} >
        
        <FlatList
           data={this.state.FlatListPurchases}
           ItemSeparatorComponent={this.ListViewItemSeparator}
           keyExtractor={(item, index) => index.toString()}
           renderItem={({ item }) => (
             <View key={item.purch_id} style={{ backgroundColor: 'white', padding: 20,borderRadius:10,margin:10,elevation:10,borderWidth:0.5,borderColor:"black",marginBottom:2 }}>
              <Text>Id: {item.purch_id}</Text>
              <Text>ItemList: {item.i_list}</Text>
              <Text>Seller: {item.seller}</Text>
              <Text>Payment: {item.pay_status}</Text>
             </View>
           )}
         />
       </View>
       <View style={{flexDirection:"row"}} > 
         
        <FlatList
           data={this.state.FlatListBills}
           ItemSeparatorComponent={this.ListViewItemSeparator}
           keyExtractor={(item, index) => index.toString()}
           renderItem={({ item }) => (
             <View key={item.bill_id} style={{ backgroundColor: 'white', padding: 20,borderRadius:10,margin:10,elevation:10,borderWidth:0.5,borderColor:"black",marginBottom:2 }}>
                 
               <Text>Id: {item.bill_id}</Text>
               <Text>Bill_Name: {item.bill_type}</Text>
               <Text>Rem_Date: {item.rem_date}</Text>
               
             </View>
           )}
         />
       </View>
       <View style={{flexDirection:"row"}} >
        
        <FlatList
           data={this.state.FlatListDiaries}
           ItemSeparatorComponent={this.ListViewItemSeparator}
           keyExtractor={(item, index) => index.toString()}
           renderItem={({ item }) => (
             <View key={item.entry_id} style={{ backgroundColor: 'white', padding: 20,borderRadius:10,margin:10,elevation:10,borderWidth:0.5,borderColor:"black",marginBottom:2 }}>
                 
               <Text>Id: {item.entry_id}</Text>
               <Text>Name: {item.type}</Text>
               <Text>Subject: {item.entry}</Text>
       
             </View>
           )}
         />
       </View>
     </ScrollView>
     </View> 
    );
  }
}
