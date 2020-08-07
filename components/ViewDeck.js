import React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'

import { getDeck, deleteDeck } from '../utils/helper'
import TextButton from './TextButton'

class ViewDeck extends React.Component {

    state={
        deck: {},
        isAvailable: true,
    }

    async componentDidMount() {
        // Fetch the Deck Details
        const { deckTitle } = this.props.route.params
        const deckDetails = await getDeck(deckTitle).catch((error) => {
            console.error('Individual Deck data could not be received ', error)
        })
        this.setState({
            deck: deckDetails
        })
        if( deckDetails === undefined){            
            this.setState({
                isAvailable: false,
            })
        }else{
            this.setState({
                deck: deckDetails,
            })
        }
    }

    handleDeleteDeck = async () => {
        const { deckTitle } = this.props.route.params
        console.log('Deleting Deck')
        await deleteDeck(deckTitle).catch(() => {
            Alert.alert(
                'Action could not be completed',
                'The Deck could not be deleted. Please try again'
            )
        })
        this.props.navigation.navigate('Home');
    }

    render() {
        const { deckTitle } = this.props.route.params
        const { deck } = this.state
        
        if(!this.state.isAvailable){
            return(
                <View>
                    <Text>
                        No Data found for this Deck. Please try adding this deck again.
                    </Text>
                </View>
            )
        }

        return(       
            <View style={styles.container}>
                <View style={styles.textContent}>
                    <Text style={styles.title}>
                        {`${ deck.title }`}
                    </Text> 
                    <Text style={styles.content}>
                        {/* { deck.questions.length <= 1 ? `${deck.questions.length} Question` : `${deck.questions.length} Questions`} */}
                        2 Cards
                    </Text>
                </View>
                <View>
                    <TextButton name='Add Card' 
                        onPress={() => this.props.navigation.navigate('AddCard', { deckTitle })}
                    />
                    <TextButton name='Take Quiz'
                        onPress={() => this.props.navigation.navigate('QuizView', { deckTitle })}
                    />
                    <TextButton name='Delete Deck' color='red' onPress={this.handleDeleteDeck}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: 'center',
    },
    textContent: {
        flex: 1,
        minHeight: 200,
        maxHeight: 300,
        width: 300,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#edeeef'
    },
    title: {
        fontSize: 30, 
        fontWeight: 'bold',       
    },
    content: {
        fontSize: 20,
        fontWeight: "700",
    }
})

export default ViewDeck