import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Contacts from 'react-native-contacts';


export default class ContactList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fakeContact: [],
      SelectedFakeContactList: []
    }
  }

  press = (hey) => {
    this.state.fakeContact.map((item) => {
      if (item.recordID === hey.recordID) {
        item.check = !item.check
        if (item.check === true) {
          this.state.SelectedFakeContactList.push(item);
          console.log('selected:' + item.givenName);
        } else if (item.check === false) {
          const i = this.state.SelectedFakeContactList.indexOf(item)
          if (1 != -1) {
            this.state.SelectedFakeContactList.splice(i, 1)
            console.log('unselect:' + item.givenName)
            return this.state.SelectedFakeContactList
          }
        }
      }
    })
    this.setState({fakeContact: this.state.fakeContact})
  }

  _showSelectedContact() {
    return this.state.SelectedFakeContactList.length;
  }

  componentDidMount() {
    Contacts.checkPermission((err, permission) => {
      // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
      if (permission === 'undefined') {
        Contacts.requestPermission((err, permission) => {
          // ...
        })
      }
      if (permission === 'authorized') {
        // yay!
      }
      if (permission === 'denied') {
        // x.x
      }
    })

    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        // error
      } else {
        // contacts returned in []
        contacts.map(info => {
          info.check = false;
          return contacts;
        })
        console.log(contacts);
        this.setState({fakeContact: contacts.sort()})
      }
    })
  }

  _showContactList = () => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    fetch(url).then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data);
      return this.setState({fakeContact: data})
    }).catch((err) => {
      console.log(err);
    })
  };

  renderHeader = () => {
    return <Header/>
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.storyContainer}>
          <FlatList data={this.state.fakeContact} keyExtractor={item => item.recordID} extraData={this.state} ListHeaderComponent={this.renderHeader} renderItem={({item}) => {
            return <TouchableOpacity style={{
              flexDirection: 'row',
              padding: 10,
              borderBottomWidth: 1,
              borderStyle: 'solid',
              borderColor: '#ecf0f1'
            }} onPress={() => {
              this.press(item)
            }}>
              <View style={{
                flex: 3,
                alignItems: 'flex-start',
                justifyContent: 'center'
              }}>
                {item.check
                  ? (
                    <Text style={{
                      fontWeight: 'bold'
                    }}>{`${item.familyName} ${item.givenName}`}</Text>
                  )
                  : (
                    <Text>{`${item.familyName} ${item.givenName}`}</Text>
                  )}
              </View>
              <View style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center'
              }}>
                {item.check
                  ? (
                    <Icon name="ios-checkbox" size={30} color={primaryColor}></Icon>
                  )
                  : (
                    <Icon name="ios-square-outline" size={30} color={darkGrey}></Icon>
                  )}
              </View>
            </TouchableOpacity>
          }}/>
        </View>
        <View>
          {(this.state.SelectedFakeContactList.length > 0)
            ? (
              <View style={styles.containerFooter}>
                <View style={{
                  flex: 3,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  alignContent: 'center'
                }}>
                  <FlatList data={this.state.SelectedFakeContactList} horizontal={true} extraData={this.state} keyExtractor={(item, index) => item.recordID} renderItem={({item, index}) => {
                    return <View style={{
                      paddingTop: 10
                    }}>
                      <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                        padding: 2
                      }}>{`${item.givenName},`}
                      </Text>
                    </View>
                  }}/>

                </View>
                <View style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center'
                }}>
                  <TouchableOpacity style={{
                    padding: 10
                  }} onPress={() => Alert.alert('Message sent :)')}>

                    <Icon name="ios-paper-plane" size={30} color="white"></Icon>
                  </TouchableOpacity>
                </View>
              </View>
            )
            : null
}
        </View>

      </View>
    );
  };
};

const primaryColor = "#1abc9c";
const lightGrey = "#ecf0f1";
const darkGrey = "#bdc3c7";

const Header = (props) => (
  <View style={styles.searchContainer}>
    <TextInput style={styles.input} placeholder="Search..." onChangeText={(text) => console.log('searching for ', text)}/>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 0
  },
  containerFooter: {
    height: 50,
    backgroundColor: '#1abc9c',
    padding: 5,
    flexDirection: 'row'
  },
  searchContainer: {
    flex: 1,
    padding: 5,

    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1'
  }
});