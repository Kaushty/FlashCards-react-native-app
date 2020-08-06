import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'

import DeckList from './components/DeckListView'

function AppStatusBar () {
  return(
    <View style={{height: Constants.statusBarHeight}}>
      <StatusBar 
        translucent
        barStyle='dark-content'
      />    
    </View>
  )
}

export default function App() {
  return (
    <View style={{flex:1}}>
      <AppStatusBar />
      <DeckList />
    </View>
  );
}