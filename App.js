import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import DeckList from './components/DeckListView'
import AddDeck from './components/AddDeck'
import ViewDeck from './components/ViewDeck'

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

function TabNavigation(){
  return(
    <Tab.Navigator>
        <Tab.Screen name='Decks' component={ DeckList } />
        <Tab.Screen name='Add Deck' component={ AddDeck } />
    </Tab.Navigator> 
  )
}

const Stack = createStackNavigator()

function StackNavigation() {
  return(
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={TabNavigation}/>
      <Stack.Screen name='ViewDeck' component={ViewDeck}
        options={ {title: 'View Deck'} }
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
   <NavigationContainer>
      <View style={{flex:1}}>
        <AppStatusBar />
        <StackNavigation /> 
      </View>
   </NavigationContainer>
  )
}