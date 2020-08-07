import React from 'react'
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native'
import CardFlip from 'react-native-card-flip'

import { getDeck } from '../utils/helper';
import TextButton from './TextButton';

export default class QuizView extends React.Component {
    state={
        deckData : null,
        totalQuestions: 0,
        answeredQuestions: 0,
        correctAnswers: 0,
    }

    async componentDidMount() {
        const { deckTitle } = this.props.route.params
        const deckData = await getDeck(deckTitle)  
        if( deckData !== undefined){
            const totalQuestions = deckData.questions.length
            this.setState({
                deckData,
                totalQuestions,
            })      
        }
    }

    handleReset = () => {
        // reset the state
        this.setState((state) => ({
            answeredQuestions: 0,
            correctAnswers: 0,
        }))
    }

    handleCorrect = () => {
        // change state 
        console.log('Handling Correct')
        this.setState((prevState) => ({
            answeredQuestions: prevState.answeredQuestions + 1,
            correctAnswers: prevState.correctAnswers + 1,
        }))
    }

    handleIncorrect = () => {
        console.log('Handling Incorrect')
        this.setState((prevState) => ({
            answeredQuestions: prevState.answeredQuestions + 1,
        }))
    }

    render() {
        const { deckData, totalQuestions, answeredQuestions, correctAnswers } = this.state;   
        // const arr  = deckData.questions

        if(deckData === null){
            return(
                <View style={styles.container}>
                    <Text style={styles.infoText}>
                        Something went wrong. Please try again later.
                    </Text>
                    <TextButton name='Return' onPress={() => this.props.navigation.goBack()}/>
                </View>
            )
        }

        if(totalQuestions === 0) {
            return(
                <View style={styles.container}>
                    <Text style={styles.infoText}>
                        There are no cards in this deck. Try adding some cards first.
                    </Text>
                    <TextButton name='Return' onPress={() => this.props.navigation.goBack()}/>
                </View>
            )
        }

        // All Questions are answered 
        if( answeredQuestions === totalQuestions ){
            return(
                <View style={styles.container}>
                    <Text style={[styles.infoText, styles.greetText]}>
                        Congratulations!! You have completed the quiz.
                    </Text>
                    <Text style={[styles.infoText, { fontSize: 23, fontWeight: 'bold'}]}>
                        You scored {correctAnswers} out of {totalQuestions}.
                    </Text>
                    <Text style={[styles.infoText, { color: '#10A5F5' }]}>
                        Keep Praciticing!!
                    </Text>          
                    <TextButton name='Retake Quiz' onPress={this.handleReset}/>          
                </View>
            )
        }

        return(
            <View style={styles.container}>
                <Text style={styles.plainText}>
                    Question { answeredQuestions } / { totalQuestions }
                </Text> 

                <CardFlip style={styles.cardContainer} ref={card => (this.card = card)}>
                    <TouchableOpacity
                        style={[styles.card, styles.card1]}
                        onPress={() => this.card.flip()}>
                        <Text style={styles.label}>
                            {
                                deckData.questions[answeredQuestions].question
                            }                        
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.card, styles.card2]}
                        onPress={() => this.card.flip()}>
                        <Text style={styles.label}>
                            {
                                deckData.questions[answeredQuestions].answer
                            } 
                        </Text>
                    </TouchableOpacity>
                </CardFlip>

                <TextButton name='Correct' onPress={() => this.handleCorrect()}/>
                <TextButton name='Incorrect' onPress={() => this.handleIncorrect()}/>         
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
    plainText: {
        alignSelf: 'flex-start',
        fontSize: 18,
        padding: 5,
        fontWeight: '700',
        borderWidth: 1,
        borderRadius: 10,
    },
    infoText: {
        fontSize: 21,
        margin: 10,
        padding: 10,
    },
    greetText:{
        textAlign: 'center',
        backgroundColor: '#7AD7F0',
        borderColor: 'black',
        borderRadius: 10,
    },
    cardContainer: {   
        flex: 1, 
        justifyContent: 'center',            
        borderRadius: 20, 
        padding: 10, 
        margin: 15,     
        width: 270,
        maxHeight: 380,
    },    
    card: {
        flex: 1,
        borderRadius: 15,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
    },
    card1: {
        backgroundColor: '#FE474C',
    },
    card2: {
        backgroundColor: '#FEB12C',
    },
    label: {
        flex: 1,
        paddingTop: 60,
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 21,
        fontFamily: 'System',
        color: '#f7f7f7',
        backgroundColor: 'transparent',
    },
})