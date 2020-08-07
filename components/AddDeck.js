import React from 'react'
import { View, Text, TouchableOpactiy, TextInput, StyleSheet, Alert } from 'react-native'

import { saveDeckTitle, clearDecks } from "../utils/helper"
import TextButton from "./TextButton"

class AddDeck extends React.Component {
    state={
        deckName: '',
    }

    saveDeck = () => {
        const { deckName } = this.state
        if(deckName.trim() !== ''){            
            // Save deck to store and localstorage
            saveDeckTitle(deckName.trim())
            // Reset the form
            this.setState({
                deckName: '',
            })
            // Return to DeckList
            this.props.navigation.navigate('Decks', { isUpdated: true })
        }
        else{
            Alert.alert(
                'Deck title missing',
                'Please enter a correct name for your deck'
            )
        }
    }

    clearAllDecks = () => {
        clearDecks();
    }

    render() {
       return(
        <View style={styles.container}>
            <Text style={styles.title}> Add Deck </Text>
            <Text style={styles.subTitle}>
                Enter a name for your Deck                
            </Text>
            <TextInput                
                style={styles.textInput}
                value={this.state.deckName}
                placeholder='Enter a name'
                onChangeText={(deckName) => {this.setState({
                    deckName,
                })}}
            >
            </TextInput>
            <TextButton name='Submit' onPress={this.saveDeck}/>
            <TextButton name='Clear all Decks' onPress={this.clearAllDecks} />
        </View>
       )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    textInput: {
        width: 250,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        margin: 10,
        color: 'black',
        backgroundColor: '#f7f7f7',
    },
    title: {
        padding: 10,
        textAlign: 'center',
        color: 'black',
        backgroundColor: '#f7f7f7',
        fontSize: 30,
        borderRadius: 20,
    },
    subTitle: {
        fontSize: 20,        
    }
})

export default AddDeck