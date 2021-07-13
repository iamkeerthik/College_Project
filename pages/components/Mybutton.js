/*Custom Button*/
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
const Mybutton = props => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#b30000',
    color: '#ffffff',
    padding: 10,
    marginTop: 15,
    marginLeft: 85,
    marginRight: 85,
    borderBottomEndRadius:30,
    borderTopLeftRadius:30,
    elevation:10
  },
  text: {
    color: '#ffffff',
    fontSize:20,
    fontWeight:"bold"
  },
});
export default Mybutton;