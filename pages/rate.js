import StarRating from 'react-native-star-rating';
import React from 'react';
import {TextInput} from 'react-native-paper';
import Mytextinput from './components/Mytextinput';
var SendIntentAndroid = require("react-native-send-intent");
import { View,TouchableOpacity,Text,ToastAndroid} from 'react-native';
class GeneralStarExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
      feedback:''
    };
  }
submit=()=>{
  const {feedback}=this.state;
  const {starCount}=this.state;
  this.props.navigation.navigate('HomeScreen')
  ToastAndroid.showWithGravity('Thank You', ToastAndroid.SHORT,ToastAndroid.CENTER)
  var SendIntentAndroid = require("react-native-send-intent");
 
SendIntentAndroid.sendMail("iamkirix@gmail.com", "Feedback", `Ratings:${starCount}   ${feedback}`);
  this.setState({
    feedback: "",
  })
}
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
      feedback:''
    });
  }

  render() {
    return (
    
      <View style={{borderRadius:8,elevation:8,flex:1,margin:10,marginTop:5}}>
      <View style={{margin:30,marginTop:90}}>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor="green"
        halfStarColor="yellow"
        emptyStarColor="red"
        halfStarEnabled={true}
      />
      </View>
      <Mytextinput
              placeholder=" Enter Comment"
              maxLength={225}
              value={this.state.feedback}
              numberOfLines={5}
              multiline={true}
              onChangeText={feedback => this.setState({ feedback })}
              style={{textAlignVertical : 'top', padding:10}}
            />
         
            <TouchableOpacity style={{backgroundColor:"skyblue",marginLeft:80,marginRight:80,marginTop:20,alignItems:"center",borderRadius:10,elevation:8,height:40,}}
            onPress={this.submit}
            >
              <Text style={{fontSize:25,fontWeight:"bold",color:"white"}}> Submit</Text>
            </TouchableOpacity>
              
      </View>
      
    );
  }
}

export default GeneralStarExample