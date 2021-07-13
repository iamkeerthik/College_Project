import React, { Component } from 'react';
import {
  Share,
  Text,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { View } from 'native-base';

const shareOptions = {
  title: 'Share Via',
  message: 'Try this Awesome app https://drive.google.com/file/d/1-2HlUCZaSNBs5i_CplM5GsGj-H_RhTnZ/view?usp=drivesdk', // Note that according to the documentation at least one of "message" or "url" fields is required
  url: 'https://www.example.com',
  
};

export default class ShareExample extends React.Component {

  onSharePress = () =>{
    Share.share(shareOptions);
    this.props.navigation.navigate('HomeScreen')
  } 

  render(){
    return(
      <ImageBackground

        style={{ flex: 1 ,}}
      
        source={
          require('./logo/background.jpg') 
        }
        >
          <View style={{alignItems:"center",marginTop:50}}>
            <Text style={{fontSize:60,fontWeight:"bold"}}>Thank You </Text>
            <Text style={{fontSize:20,fontWeight:"bold"}}>for your support</Text>
          </View>
      <View style={{alignItems:"center",padding:100,marginTop:100}}>
      <TouchableOpacity onPress={this.onSharePress} style={{backgroundColor:"green",padding:10,borderRadius:10,elevation:8}} >
        <Text style={{fontSize:20,fontWeight:"bold",color:"white"}}>Share this App</Text>
      </TouchableOpacity>
      </View>
      
      </ImageBackground>
    );
  }
}