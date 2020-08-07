import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import DeckList from './components/DeckListView'
import AddDeck from './components/AddDeck'

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

const Tab = createBottomTabNavigator()

export default function App() {
  return (
   <NavigationContainer>
      <View style={{flex:1}}>
        <AppStatusBar />
        <Tab.Navigator>
          <Tab.Screen name='Decks' component={ DeckList } />
          <Tab.Screen name='Add Deck' component={ AddDeck } />
        </Tab.Navigator>
        {/* <DeckList />
        <AddDeck /> */}
      </View>
   </NavigationContainer>
  )
}