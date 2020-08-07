import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { getDeck } from '../utils/helper'
import TextButton from './TextButton'

class ViewDeck extends React.Component {

    state={
        deck: {},
        isAvailable: true,
    }

    async componentDidMount() {
        // Fetch the Deck Details
        const { deckTitle } = this.props.route.params
        const deckDetails = await getDeck(deckTitle)
        this.setState({
            deck: deckDetails
        })
        if( deckDetails === 'undefined'){            
            this.setState({
                isAvailable: false,
            })
        }else{
            this.setState({
                deck: deckDetails,
            })
        }
    }

    render() {
        // const { deckTitle } = this.props.route.params
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
                        { deck.questions.length <= 1 ? `${deck.questions.length} Question` : `${deck.questions.length} Questions`}
                        2 Cards
                    </Text>
                </View>
                <View>
                    <TextButton name='Add Card'/>
                    <TextButton name='Take Quiz'/>
                    <TextButton name='Delete Deck' color='red'/>
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