import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { setLocalNotification } from "./utils/notificationHandler";
import DeckList from './components/DeckListView'
import AddDeck from './components/AddDeck'
import ViewDeck from './components/ViewDeck'
import AddCard from './components/AddCard'
import QuizView from './components/QuizView'

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
        <Tab.Screen name='Decks' component={ DeckList } 
           options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            )}} 
        />
        <Tab.Screen name='Add Deck' component={ AddDeck } 
           options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus" color={color} size={size} />
            )}} 
        />
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
      <Stack.Screen name='AddCard' component={AddCard} 
        options={ {title: 'Add Card'}}
      />
      <Stack.Screen name='QuizView' component={QuizView}
        options={ {title: 'Quiz Time'}}
      />
    </Stack.Navigator>
  )
}

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <NavigationContainer>
         <View style={{flex:1}}>
           <AppStatusBar />
           <StackNavigation /> 
         </View>
      </NavigationContainer>
     )
  }
}