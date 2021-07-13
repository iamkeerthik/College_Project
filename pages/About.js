import React, { Component } from 'react';
import { View, Text,Image,Button} from 'react-native';
import {Ionicons} from 'react-native-vector-icons';
import {IconButton,Appbar}from 'react-native-paper';
export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      
      <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
      }}>
       <Appbar.Header>
        
       <Appbar.Action icon="home"
       onPress={()=>this.props.navigation.navigate('HomeScreen')}
       
      />
    </Appbar.Header>
    
    <View style={{height: 100,alignItems: 'center', justifyContent: 'center',backgroundColor:"white",marginBottom:5}}>
   
   <Image style={{height:100,width:300,marginRight:50,marginLeft:50}} source={require('./logo/logo2.jpg')} />
</View>  
       <View style={{alignItems:"center",borderWidth:2,margin:5,backgroundColor:"lightgrey"}}>
        <Text style={{fontSize:20,margin:20,marginTop:5 }}> This app is developed 
            for Home owner to manage his daily
             tasks and events that occur 
             throughout the year. </Text>
         
        </View>
        <View style={{marginTop:5,padding:5,flexDirection:"column"}}>
        <Button title="Developed By"></Button>
        <Text style={{fontSize:15,margin:10,marginTop:10,fontWeight:"bold" }}> 
             Keerthik Shenoy
            </Text>
            <Text style={{fontSize:15,margin:10,fontWeight:"bold",marginTop:-5 }}> 
             Nagendra Adiga
            </Text>
            <View style={{flexDirection:"row"}}>
            <Text style={{fontSize:18,margin:10,marginTop:-5 }}> 
             Under guidance of
            </Text>
            <Text style={{fontSize:18,margin:10,fontWeight:"bold",marginTop:-5,marginLeft:-5 }}> 
             Giriraj Bhat
            </Text>
            </View>
        </View>
        <View style={{alignItems:"center",marginTop:50}}>
          <Text> Made with </Text>
          <Text style={{color:"red"}}> Love</Text>
       </View>  
      </View>
    );
  }
}
