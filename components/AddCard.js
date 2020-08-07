import React from 'react'
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";

import TextButton from './TextButton'
import { saveQuestion } from '../utils/helper'

export default class AddCard extends React.Component {
    state={
        question: '',
        answer: '',
    }

    handleCardSubmit = () => {
        const { deckTitle } = this.props.route.params
        // validate the inputs
        const { question, answer } = this.state
        if(question.trim() !== ''&& answer.trim() !== ''){
            const card = {
                question: question.trim(),
                answer: answer.trim()
            }
            // Save the card
            saveQuestion(deckTitle, card).catch(() => {
                Alert.alert(
                    'Action could not be completed',
                    'Your card was not saved succcessfully. Please try again.'
                )
            })
            this.props.navigation.navigate('ViewDeck')
        }else{
            Alert.alert(
                'Data missing',
                'Please fill all the details'
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.subTitle}>
                    Add a new Card to your Deck
                </Text>
                <Text style={styles.text}>
                    Add your Question
                </Text>
                <TextInput                
                    style={styles.textInput}
                    value={this.state.question}
                    onChangeText={(question) => {this.setState({ question })}}
                    placeholder='Enter your Question'               
                />
                <Text style={styles.text}> 
                    Add your Answer
                </Text>
                <TextInput                
                    style={styles.textInput}
                    value={this.state.answer}
                    onChangeText={(answer) => {this.setState({ answer })}}
                    placeholder='Enter your Question'               
                />
                <TextButton name='Submit' onPress={this.handleCardSubmit}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 20,
        padding: 10,
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
    subTitle: {
        padding: 10,
        margin: 10,
        textAlign: 'center',
        color: 'black',
        backgroundColor: '#f7f7f7',
        fontSize: 22,
        borderRadius: 20,        
    },
    text: {
        fontSize: 18,        
    }
})