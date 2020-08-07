import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

import { _store_data, getDecks } from '../utils/helper'

class DeckList extends Component {

    state = {
        decks: {}
    }

    async componentDidMount(){
        const result = await getDecks()
        this.setState({
            decks: result,
        })
    }
    
    render() {
        const { decks } = this.state
        
        return(
            <View style={styles.container} >
                <Text style={styles.title}>
                   Decks
                </Text>
                {/* Card View */}             
                <ScrollView contentContainerStyle={styles.cardList}>
                {
                    Object.keys(decks).map((title) => {
                        // Display individual cards
                        const questions = decks[title].questions
                        return(
                            <TouchableOpacity key={title} style={styles.card}>
                                <Text style={styles.cardTitle}>
                                    {title}
                                </Text>
                                <Text style={styles.cardText}>
                                    {
                                        questions.length <= 1 ? 
                                            `${questions.length} Question` :
                                            `${questions.length} Questions`                  
                                    }
                                </Text>
                            </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        padding: 10,
        textAlign: 'center',
        color: 'black',
        backgroundColor: '#f7f7f7',
        fontSize: 20,
        borderRadius: 20,
    },
    cardList: {
        
        padding: 10,
        alignItems: 'center',
    },
    card: {
        flex: 1,
        width: 300,
        minHeight: 230,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#f9f9f9',
    },
    cardTitle: {
        fontSize: 20,
    },
    cardText: {
        fontSize: 12,
    }
})

export default DeckList