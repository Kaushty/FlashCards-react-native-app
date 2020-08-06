import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

import { _store_data, getDecks } from '../utils/helper'

class DeckList extends Component {

    state = {
        cards: {}
    }

    async componentDidMount(){
        _store_data();
        const result = await getDecks();
        console.log(result)
        this.setState({
            cards: result,
        })
    }
    
    render() {
        const { cards } = this.state;
        
        return(
            <View style={styles.container}>
                <Text style={styles.title}>
                    Decks
                </Text>
                {/* Card View */}             
                <View style={styles.cardList}>
                {
                    Object.keys(cards).map((title) => {
                        // Display individual cards
                        return(
                            <TouchableOpacity key={title} style={styles.card}>
                                <Text style={styles.cardTitle}>
                                    {title}
                                </Text>
                                <Text style={styles.cardText}>
                                    {
                                        cards[title].questions.length <= 1 ? 
                                            `${cards[title].questions.length} Question` :
                                            `${cards[title].questions.length} Questions`                  
                                    }
                                </Text>
                            </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        padding: 10,
        textAlign: 'center',
        color: 'black',
        backgroundColor: 'silver',
        fontSize: 30,
        borderRadius: 20,
    },
    cardList: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    card: {
        width: 300,
        flex: 1,
        maxHeight: 230,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 20,
    },
    cardTitle: {
        fontSize: 20,
    },
    cardText: {
        fontSize: 12,
    }
})

export default DeckList