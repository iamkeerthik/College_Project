import React, { Component } from 'react';
import { View, Text,Button } from 'react-native';
import RNCalendarReminders from 'react-native-calendar-reminders';

// import ReactNativeAN from 'react-native-alarm-notification';
// const fireDate = '18-02-2020 15:47:00';	
// const alarmNotifData = {
//     id: "12345",                                  // Required
//     title: "My Notification Title",               // Required
//     message: "My Notification Message",           // Required
//     channel: "my_channel_id",                     // Required. Same id as specified in MainApplication's onCreate method
//     ticker: "My Notification Ticker",
//     auto_cancel: true,                            // default: true
//     vibrate: true,
//     vibration: 100,                               // default: 100, no vibration if vibrate: false
//     small_icon: "ic_launcher",                    // Required
//     large_icon: "ic_launcher",
//     play_sound: true,
//     sound_name: null,                             // Plays custom notification ringtone if sound_name: null
//     color: "red",
//     schedule_once: true,                          // Works with ReactNativeAN.scheduleAlarm so alarm fires once
//     tag: 'some_tag',
//     fire_date: fireDate,                          // Date for firing alarm, Required for ReactNativeAN.scheduleAlarm.
 
//     // You can add any additional data that is important for the notification
//     // It will be added to the PendingIntent along with the rest of the bundle.
//     // e.g.
//   	data: { foo: "bar" },
// };
export default class alaram extends Component {
    method=()=>{
        // Schedule Future Alarm
        // ReactNativeAN.scheduleAlarm(alarmNotifData);
        // ReactNativeAN.sendNotification(alarmNotifData);
        // ReactNativeAN.sendNotification(alarmNotifData);
        // console.log("reminder set")
        // ReactNativeAN.getScheduledAlarms().then(alarmNotif=>console.log(alarmNotif));
        RNCalendarReminders.saveReminder('Hi',{ 
            location: 'location',
            notes: 'notes',
            startDate: '2020-19-01 09:41:00',
            alarms: [{
              date:'2020-19-01 09:43:00',  // or absolute date
            }]
          });
    }

  render() {
    return (
      <View>
        <Button title="click me" onPress={()=>{this.method()}}></Button>
      </View>
    );
  }
}
