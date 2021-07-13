import React from 'react';
import {View,StatusBar } from 'react-native';
import Video from 'react-native-video'
import Worker from './worker';

export  default class SplashPage extends React.Component {

componentWillMount () {
        var navigator = this.props.navigation;
        setTimeout (() => {

          navigator.replace({
                screen:Worker,
                 // <-- This is the View you go to
            });
        }, 3000);     //<-- Time until it jumps to "MainView"
    }
    render () {
        console.disableYellowBox="true"
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',width:null,height:null}}>
               <Video source={require('./video/splash.mp4')}
                     style={{position: 'absolute',
                             top: 0,
                             left: 0,
                             right: 0,
                             bottom: 0,
                             }}
                             muted={true}
                             repeat={true}
                             resizeMode="cover"/>
               <View>{StatusBar.setBackgroundColor('black', true)}</View> 
               {/*<Image style={{ width: windowSize.width, height: windowSize.height}} source={require('./images/splash.png')}></Image>*/} 
            </View>
        );
    }
}