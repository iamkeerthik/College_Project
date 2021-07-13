import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
 
PermissionsAndroid.request(
  PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  {
    'title': 'Contacts',
    'message': 'This app would like to view your contacts.',
    'buttonPositive': 'Please accept bare mortal'
  }
).then(() => {
  Contacts.getAll((err, contacts) => {
    if (err === 'denied'){
      // error
    } else {
      // contacts returned in Array
      console.log(contacts);
    }
  })
})