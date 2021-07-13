import React, { Component } from 'react';
import {
  Share,
  Text,
  TouchableOpacity
} from 'react-native';

const shareOptions = {
  title: 'Title',
  message: 'Message to share', // Note that according to the documentation at least one of "message" or "url" fields is required
  url: 'www.example.com',
  subject: 'Subject'
};
// const shareOptions = {
//     title: 'Share via',
//     message: 'some message',
//     url: 'some share url',
//     social: Share.Social.WHATSAPP,
//     whatsAppNumber: "9199999999",  // country code + phone number(currently only works on Android)
//     filename: 'test' , // only for base64 file in Android 
// };

export default class ShareExample extends React.Component {

  onSharePress = () => Share.share(shareOptions);

  render(){
    return(
      <TouchableOpacity onPress={this.onSharePress} >
        <Text>Share data</Text>
      </TouchableOpacity>
    );
  }
}